export interface StaffTool {
  name: string;
  url: string;
}

export interface StaffCategory {
  name: string;
  tools: StaffTool[];
}

export const staffTools: StaffCategory[] = [
  {
    name: "Communication",
    tools: [
      {
        name: "Follow up Inquire",
        url: "https://gemini.google.com/gem/1vGS0flMIHVfpHQKJnjeEHcSc71G-3REn?usp=sharing"
      },
      {
        name: "Hotel Inquire",
        url: "https://gemini.google.com/gem/1NcXySImtXjO6eqGN7_OpzXSB9YbBXPvx?usp=sharing"
      },
      {
        name: "Flight Ticket Inquire",
        url: "https://gemini.google.com/gem/1k-fDpt8YUrnpiOUbCnFpcagzgivq7OT2?usp=sharing"
      },
      {
        name: "Ticket and Activities Inquire",
        url: "https://gemini.google.com/gem/1r4I0cFrKwwuULVXQby_QwWoOTRTrFt1T?usp=sharing"
      },
      {
        name: "Car Rental Inquire",
        url: "https://gemini.google.com/gem/12z1BHqRNNEE7TU2fRK2wZxGqkd3Ocjz0?usp=sharing"
      }
    ]
  },
  {
    name: "Tour Package Calculation",
    tools: [
      {
        name: "Tour Package များ ဈေးနှုန်းတွက်ရန်",
        url: "https://asiabuddy.app/admin/thquo"
      },
      {
        name: "Hotel ဈေးနှုန်းများရှာရန်",
        url: "https://www.perplexity.ai/projects/asiabuddy-hotel-pricing-resear-40QN.Z20TB.7gWmXZZ3aOQ"
      },
      {
        name: "Transport ဈေးနှုန်းများရှာရန်",
        url: "https://www.perplexity.ai/projects/transport-car-rental-pricing-r-QbrE4ONFS_OrmXifMkP2fA"
      },
      {
        name: "အစားအသောက် ဈေးနှုန်းများရှာရန်",
        url: "https://www.perplexity.ai/projects/meals-pricing-research-6eHy49XoQlyJH5RxCPorWQ"
      },
      {
        name: "ဝင်ကြေးလက်မှတ်များ / Activities ဈေးနှုန်းများရှာရန်",
        url: "https://www.perplexity.ai/projects/tickets-activities-pricing-res-Jh5KqQIUQueZAHLfKEm25w"
      }
    ]
  }
];
