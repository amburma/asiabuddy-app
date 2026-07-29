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
  }
];
