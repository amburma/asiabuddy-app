interface CostComponents {
  hotel: {
    per_night_rate: number;
    nights: number;
    notes: string;
  };
  transport: {
    mode: 'private' | 'public';
    total_cost: number;
    car_rental_kb_rate?: number;
  };
  meals: {
    per_person_per_day_rate: number;
    notes: string;
  };
  tickets_activities: Array<{
    name: string;
    cost: number;
  }>;
  guide: {
    rate_type: 'flat' | 'per_day';
    amount: number;
  };
}

interface PricingInput {
  cost_components: CostComponents;
  total_pax: number;
  child_no_bed_count: number;
  foc_count?: number;
  margin_pct?: number;
}

interface PricingSnapshot {
  total_direct_cost: number;
  contingency: number;
  currency_buffer: number;
  subtotal: number;
  gross_tour_price: number;
  group_discounted_price: number;
  adult_price_per_person: number;
  child_no_bed_price_per_person: number | null;
  total_package_price: number;
}

export function calculateQuotationPrice(input: PricingInput): PricingSnapshot {
  const { cost_components, total_pax, child_no_bed_count, foc_count = 0, margin_pct = 0.08 } = input;

  // Calculate hotel cost (per room basis)
  const hotelTotal = cost_components.hotel.per_night_rate * cost_components.hotel.nights;
  
  // Calculate transport cost
  const transportTotal = cost_components.transport.total_cost;
  
  // Calculate meals cost (per person per day)
  const mealsTotal = cost_components.meals.per_person_per_day_rate * cost_components.hotel.nights * total_pax;
  
  // Calculate tickets/activities cost
  const ticketsTotal = cost_components.tickets_activities.reduce((sum, item) => sum + item.cost, 0);
  
  // Calculate guide cost
  const guideTotal = cost_components.guide.amount;
  
  // Total direct cost
  const total_direct_cost = hotelTotal + transportTotal + mealsTotal + ticketsTotal + guideTotal;
  
  // Contingency (2%)
  const contingency = total_direct_cost * 0.02;
  
  // Currency buffer (2%)
  const currency_buffer = total_direct_cost * 0.02;
  
  // Subtotal
  const subtotal = total_direct_cost + contingency + currency_buffer;
  
  // Gross tour price (with margin)
  const gross_tour_price = subtotal * (1 + margin_pct);
  
  // Group discount (5% for groups of 10+)
  const group_discount_rate = total_pax >= 10 ? 0.05 : 0;
  const group_discounted_price = gross_tour_price * (1 - group_discount_rate);
  
  // Calculate per-person pricing
  const paying_adult_count = total_pax - child_no_bed_count - foc_count;
  const adult_price_per_person = group_discounted_price / (paying_adult_count + (child_no_bed_count * 0.5));
  
  // Child no bed price (50% of adult price)
  const child_no_bed_price_per_person = child_no_bed_count > 0 ? adult_price_per_person * 0.5 : null;
  
  // Total package price
  const total_package_price = (adult_price_per_person * paying_adult_count) + 
                              (child_no_bed_price_per_person ? child_no_bed_price_per_person * child_no_bed_count : 0);
  
  return {
    total_direct_cost,
    contingency,
    currency_buffer,
    subtotal,
    gross_tour_price,
    group_discounted_price,
    adult_price_per_person,
    child_no_bed_price_per_person,
    total_package_price,
  };
}