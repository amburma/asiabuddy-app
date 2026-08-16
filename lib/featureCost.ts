import { getSupabase } from './supabase';

/**
 * Feature cost configuration type.
 * Represents per-feature cost settings from the feature_cost_config table.
 */
export type FeatureCostConfig = {
  feature_key: string;
  unit_type: 'per_request' | 'per_tick';
  cost_hours: number;
  tick_interval_seconds: number | null;
};

/**
 * In-memory cache entry with expiration timestamp.
 */
interface CacheEntry {
  config: FeatureCostConfig;
  expiresAt: number;
}

// In-memory cache for feature cost configurations
const costCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Retrieves per-feature cost configuration from the feature_cost_config table.
 * 
 * This function replaces hardcoded rates like LIVE_TRANSLATE_RATES in
 * lib/tour-guide/costGateService.ts with database-driven configuration.
 * This is Phase 5 (feature_cost_config) of the Tour Guide project.
 * 
 * The configuration is cached in-memory for 60 seconds to reduce database queries.
 * 
 * @param featureKey - The feature key to look up (e.g., 'text_translate', 'photo_ocr', 'voice-translate', 'live_translator')
 * @returns The feature cost configuration
 * @throws Error if no active cost config is found for the feature or if the query fails
 * 
 * @example
 * ```ts
 * const config = await getFeatureCost('text_translate');
 * console.log(config.cost_hours); // 0.0010
 * ```
 */
export async function getFeatureCost(featureKey: string): Promise<FeatureCostConfig> {
  const now = Date.now();
  
  // Check cache first
  const cached = costCache.get(featureKey);
  if (cached && cached.expiresAt > now) {
    return cached.config;
  }
  
  // Cache miss or expired - query database
  const supabase = getSupabase();
  
  const { data, error } = await supabase
    .from('feature_cost_config')
    .select('*')
    .eq('feature_key', featureKey)
    .eq('is_active', true)
    .single();
  
  if (error || !data) {
    throw new Error(`No active cost config for feature: ${featureKey}`);
  }
  
  // Transform to FeatureCostConfig type
  const config: FeatureCostConfig = {
    feature_key: data.feature_key,
    unit_type: data.unit_type as 'per_request' | 'per_tick',
    cost_hours: Number(data.cost_hours),
    tick_interval_seconds: data.tick_interval_seconds,
  };
  
  // Store in cache with expiration
  costCache.set(featureKey, {
    config,
    expiresAt: now + CACHE_TTL_MS,
  });
  
  return config;
}
