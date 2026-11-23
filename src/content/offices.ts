interface Office {
  city: string
  company: string
  lines: string[]
  corporate?: boolean
  phones?: string[]
  emails?: string[]
}

export const offices: Office[] = [
  {
    city: 'Muscat, Oman',
    company: 'MFB Geotech Private Limited LLC',
    lines: ['Flat No. 15, Building No. 133', 'Way No. 64, Plot No. 85, Block 325', 'Al Hail, PO Box 2156, PC 900', 'Muscat, Sultanate of Oman'],
  },
  {
    city: 'Singapore',
    company: 'Tunneling Technology Company Pte. Ltd.',
    lines: ['89 Short Street, #B1–11, Golden Wall Centre', 'Singapore 188216'],
  },
  {
    city: 'New Delhi NCR, India',
    corporate: true,
    phones: ['+91 7428294523', '+91 9599703028'],
    emails: ['info@mfbumi.com', 'tenders@mfbumi.com'],
    company: 'MFB Geotech Private Limited',
    lines: ['Corporate Office, Unit No. 304, 3rd Floor', 'The Solitaire Plaza, M.G. Road, near Guru Dronacharya Metro Station', 'Sector 26, Sikanderpur, Gurugram 122002, Haryana, India'],
  },
  {
    city: 'Chennai, India',
    phones: ['+91 8754578545'],
    emails: ['sangeetha@bumigrp.com'],
    company: 'Bumi Geo Engineering Limited',
    lines: ['No. 15/17, Flat No. 13A, 3rd Floor, Jasmine Enclave', 'Anna Avenue, Kastutiba Nagar, Adyar', 'Chennai, Tamil Nadu 600020, India'],
  },
]

