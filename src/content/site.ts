export const site = {
  name: 'MFB Geotech',
  phone: import.meta.env.VITE_CONTACT_PHONE?.trim(),
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'info@mfbumi.com',
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Our Expertise', path: '/services' },
  { label: 'Our Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
] as const

export const services = [
  {
    title: 'Foundation engineering',
    summary: 'We build foundations that support structures on difficult ground and install retaining systems that hold soil in place during excavation.',
    points: [
      'Micropiles transfer structural loads to stronger ground.',
      'Rows of piles or reinforced walls hold soil back around excavations.',
      'King posts and plunge columns support structures during construction.',
    ],
  },
  {
    title: 'Ground improvement',
    summary: 'Specialist methods for strengthening ground and controlling water ingress.',
    points: ['Jet, TAM, and chemical grouting', 'Fissure and cavity grouting', 'Deep-hole drilling, grouting, and leakage control'],
  },
  {
    title: 'Slope stabilisation and deep excavation',
    summary: 'Slope protection and excavation support for infrastructure and mining sites.',
    points: ['Ground anchors, rock bolts, and shotcrete', 'Drainage, wire netting, and rockfall barriers', 'Retaining walls and ground retention'],
  },
  {
    title: 'Tunnelling and underground construction',
    summary: 'Underground construction and rehabilitation for complex infrastructure.',
    points: ['NATM and cut-and-cover tunnelling', 'Pipe jacking, microtunnelling, and cross passages', 'Shaft sinking and cavern excavation'],
  },
  {
    title: 'Hydropower and marine infrastructure',
    summary: 'Specialised civil works for power, dams, and water infrastructure.',
    points: ['Hydropower tunnel works and dam rehabilitation', 'Dredging and underwater concreting', 'Geotechnical support for port infrastructure'],
  },
  {
    title: 'Mining works',
    summary: 'Design-build and construction support for surface and underground mines.',
    points: ['Underground mine development', 'Production shaft construction and equipping', 'Open-pit slope stabilisation'],
  },
] as const
