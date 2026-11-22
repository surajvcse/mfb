const imageDirectory = import.meta.env.BASE_URL + 'images/projects/'

export const projectCover = imageDirectory + 'project-1.jpg'

export const projectImage = (photo: number) => imageDirectory + `project-${photo}.jpg`

export const projectPath = (slug: string) => `/projects/${slug}`

export const projectGroups = [
  {
    id: 'hydropower',
    title: 'Hydropower',
    projects: [
      { slug: 'pallivasal-extension', title: 'Pallivasal Hydropower Extension Scheme', location: 'Munnar, Kerala, India', photos: [8] },
      { slug: 'kuther-hydroelectric', title: 'Kuther Hydroelectric Project (240 MW)', location: 'Himachal Pradesh, India', photos: [10, 11, 9] },
      { slug: 'chanju-iii', title: 'Chanju III Hydroelectric Project (48 MW), Package I', location: 'Chanju, Himachal Pradesh, India', photos: [12, 14, 13, 17] },
      { slug: 'koldam-hydroelectric', title: 'Koldam Hydroelectric Power Project', location: 'Koldam, Himachal Pradesh, India', photos: [15, 16, 21] },
    ],
  },
  {
    id: 'mining',
    title: 'Mining',
    projects: [
      { slug: 'mochia-balaria', title: 'Mochia & Balaria Mines', location: 'Udaipur, Rajasthan, India', photos: [19] },
      { slug: 'zawarmala', title: 'Zawarmala Mine Development', location: 'Udaipur, Rajasthan, India', photos: [18] },
      { slug: 'bhatin', title: 'Bhatin Mine Production and Underground Development', location: 'Bhatin, Jharkhand, India', photos: [22] },
      { slug: 'mandi-salt-mines', title: 'Mandi Salt Mine Development', location: 'Mandi, Himachal Pradesh, India', photos: [20] },
      { slug: 'dongri-buzurg', title: 'Dongri Buzurg Mine Shaft Sinking', location: 'Dongri Buzurg Mine, Nagpur, Maharashtra, India', photos: [25] },
      { slug: 'kandri', title: 'Kandri Mine Shaft Sinking', location: 'Kandri Mine, Nagpur, Maharashtra, India', photos: [24] },
    ],
  },
  {
    id: 'tunnelling',
    title: 'Tunnelling',
    projects: [
      { slug: 'munnar-tunnel', title: 'Munnar Hydropower Tunnel Works', location: 'Munnar, Kerala, India', photos: [23, 27, 26, 28] },
      { slug: 'kutehr-tunnel', title: 'Kutehr Hydroelectric Tunnel Works', location: 'Himachal Pradesh, India', photos: [29, 31, 30, 32] },
    ],
  },
  {
    id: 'geotechnical',
    title: 'Geotechnical & slope stabilisation',
    projects: [
      { slug: 'rampura-agucha', title: 'Rampura–Agucha Mine Slope Stabilisation', location: 'Rampura–Agucha, Rajasthan, India', photos: [33, 35, 34, 36] },
      { slug: 'teesta-iii', title: 'Teesta III Jet Grouting', location: 'Sikkim, India', photos: [38, 37] },
      { slug: 'jiribam-station', title: 'Jiribam Railway Station Slope Protection', location: 'Jiribam Railway Station', photos: [43] },
      { slug: 'nirgad', title: 'Nirgad Hill Slope Stabilisation', location: 'Nirgad', photos: [40, 39, 42, 44, 46] },
      { slug: 'steel-check-dam', title: 'Steel Check Dam', location: null, photos: [41] },
      { slug: 'jawadi', title: 'Jawadi Hill Slope Stabilisation', location: 'Jawadi', photos: [45, 47, 50, 48, 49, 51, 52] },
      { slug: 'padli-road', title: 'Padli Highway Realignment and Slope Stabilisation', location: 'Padli', photos: [58, 54] },
      { slug: 'new-delhi-microtunnelling', title: 'Sewer Line Microtunnelling', location: 'New Delhi, India', photos: [53, 55] },
    ],
  },
  {
    id: 'dredging',
    title: 'Dredging',
    projects: [
      { slug: 'munnar-dredging', title: 'Munnar Dredging Works', location: 'Munnar, Kerala, India', photos: [56, 57] },
      { slug: 'senkulam-dam', title: 'Senkulam Dam Dredging Works', location: 'Senkulam, Kerala, India', photos: [59, 60] },
    ],
  },
]

export const projects = projectGroups.flatMap(({ title, projects }) =>
  projects.map((project) => ({ ...project, category: title })),
)

export const projectLocation = (location: string | null) => location ?? 'Location not specified in the project profile'
