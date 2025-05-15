
import { supabase } from '@/integrations/supabase/client';
import { AnalysisArea, AnalysisResult, DetectionResult } from '@/types';

export const saveAnalysisResult = async (
  userId: string,
  imageUrl: string,
  result: DetectionResult
): Promise<string | null> => {
  try {
    // First, save the main result
    const { data: resultData, error: resultError } = await supabase
      .from('analysis_results')
      .insert({
        user_id: userId,
        image_url: imageUrl,
        prediction: result.prediction,
        confidence: result.confidence,
        recommendation: result.recommendation || null,
        image_type: result.imageType || null,
        resolution: result.resolution || null,
        format: result.format || null,
        tissues: result.tissues || null,
        sensitivity: result.sensitivity || null,
        specificity: result.specificity || null,
        accuracy: result.accuracy || null,
        cancer_risk_score: result.cancerRiskScore || null,
        diagnostic_notes: result.diagnosticNotes || null,
        metadata: result.metadata || null,
      })
      .select('id')
      .single();

    if (resultError) throw resultError;
    
    // If there are areas, save them too
    if (result.areas && result.areas.length > 0 && resultData) {
      const areasToInsert = result.areas.map(area => ({
        result_id: resultData.id,
        x: area.x,
        y: area.y,
        width: area.width,
        height: area.height,
        size: area.size || null,
        description: area.description || null,
        confidence: area.confidence || null,
        classification: area.classification || null,
      }));

      const { error: areasError } = await supabase
        .from('anomaly_areas')
        .insert(areasToInsert);

      if (areasError) throw areasError;
    }

    return resultData?.id || null;
  } catch (error) {
    console.error('Error saving analysis result:', error);
    throw error;
  }
};

export const getUserAnalysisResults = async (userId: string): Promise<AnalysisResult[]> => {
  try {
    const { data: results, error: resultsError } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (resultsError) throw resultsError;

    if (!results) return [];

    // Fetch areas for each result
    const enhancedResults = await Promise.all(
      results.map(async (result) => {
        const { data: areas, error: areasError } = await supabase
          .from('anomaly_areas')
          .select('*')
          .eq('result_id', result.id);

        if (areasError) throw areasError;

        return {
          ...result,
          areas: areas || [],
        } as AnalysisResult;
      })
    );

    return enhancedResults;
  } catch (error) {
    console.error('Error fetching user analysis results:', error);
    throw error;
  }
};

export const getAnalysisResultById = async (resultId: string): Promise<AnalysisResult | null> => {
  try {
    const { data: result, error: resultError } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('id', resultId)
      .single();

    if (resultError) throw resultError;
    if (!result) return null;

    // Fetch areas for the result
    const { data: areas, error: areasError } = await supabase
      .from('anomaly_areas')
      .select('*')
      .eq('result_id', resultId);

    if (areasError) throw areasError;

    return {
      ...result,
      areas: areas || [],
    } as AnalysisResult;
  } catch (error) {
    console.error('Error fetching analysis result by id:', error);
    throw error;
  }
};
