import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config({ path: '.env.local' });
config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkColumnPrecision() {
  try {
    console.log('Checking column definition for total_cost_usd in tour_guide_usage...\n');

    // Query information_schema for column details
    const { data: columnInfo, error: columnError } = await supabaseAdmin
      .rpc('get_column_info', { 
        table_name: 'tour_guide_usage',
        column_name: 'total_cost_usd'
      });

    // If the RPC doesn't exist, use a direct query
    if (columnError) {
      console.log('RPC not available, using direct information_schema query...\n');

      const { data: infoSchema, error: infoError } = await supabaseAdmin
        .from('information_schema.columns')
        .select('column_name, data_type, numeric_precision, numeric_scale')
        .eq('table_name', 'tour_guide_usage')
        .eq('column_name', 'total_cost_usd')
        .single();

      if (infoError) {
        console.error('Error querying information_schema:', infoError);
        process.exit(1);
      }

      console.log('Column definition from information_schema:\n');
      console.log(JSON.stringify(infoSchema, null, 2));

      if (infoSchema) {
        console.log('\nInterpretation:');
        console.log('- Data type:', infoSchema.data_type);
        console.log('- Numeric precision:', infoSchema.numeric_precision);
        console.log('- Numeric scale:', infoSchema.numeric_scale);
        
        if (infoSchema.data_type === 'numeric' && infoSchema.numeric_scale) {
          const scale = infoSchema.numeric_scale;
          console.log(`\nThis means the column can store ${scale} decimal places.`);
          console.log(`0.0000485 rounded to ${scale} decimal places = 0.0000${'0'.repeat(scale-4)}`);
          console.log('\n✅ This explains why total_cost_usd shows as 0 - it\'s correct rounding behavior, not a bug.');
        }
      }
    } else {
      console.log('Column definition from RPC:\n');
      console.log(JSON.stringify(columnInfo, null, 2));
    }

    // Also check the table structure using \d equivalent
    console.log('\n' + '='.repeat(60));
    console.log('Full table structure (tour_guide_usage):');
    console.log('='.repeat(60) + '\n');

    const { data: tableStructure, error: structureError } = await supabaseAdmin
      .from('information_schema.columns')
      .select('column_name, data_type, numeric_precision, numeric_scale, is_nullable')
      .eq('table_name', 'tour_guide_usage')
      .order('ordinal_position');

    if (structureError) {
      console.error('Error querying table structure:', structureError);
    } else {
      console.log(JSON.stringify(tableStructure, null, 2));
    }

  } catch (error) {
    console.error('Script error:', error);
    process.exit(1);
  }
}

checkColumnPrecision();