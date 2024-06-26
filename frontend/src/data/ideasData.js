export const ideas = [
  { 
    id: 1,
    title: 'Exploring Sustainable Urban Agriculture',
    description: 'This project aims to investigate sustainable methods of urban agriculture to address food security and sustainability issues in cities.',
    tags: [
      'Urban Agriculture', 
      'Sustainability', 
      'Food Security',
      'City Planning',
    ],
    date: 'Feb 2024',
    author: 'Emma Thompson',
    authorImage: require('../assets/avatar1.png'),
  },
  { 
    id: 2,
    title: 'Unlocking the Secrets of Dark Matter',
    description: 'This research seeks to unravel the mysteries of dark matter, a fundamental component of the universe, using astrophysical and particle physics approaches.',
    tags: [
      'Astrophysics', 
      'Dark Matter', 
      'Cosmology', 
      'Particle Physics'
    ],
    date: 'Jan 2024',
    author: 'Adrian Martinez',
    authorImage: require('../assets/avatar1.png'),
  },
  { 
    id: 3,
    title: 'Revolutionizing Renewable Energy Storage',
    description: 'This project aims to revolutionize the field of renewable energy storage, exploring innovative technologies for efficient and sustainable energy storage solutions.',
    tags: [
      'Renewable Energy', 
      'Energy Storage',
      'Sustainability',
    ],
    date: 'Jan 2024',
    author: 'Olivia Johnson',
    authorImage: require('../assets/avatar1.png'),
  },
  { 
    id: 4,
    title: 'Cognitive Enhancements through Neurofeedback',
    description: 'This research investigates the potential of neurofeedback techniques for enhancing cognitive abilities and promoting brain health through non-invasive methods.',
    tags: [
      'Neurofeedback', 
      'Brain Health',
      'Psychology',
    ],
    date: 'Jan 2024',
    author: 'Ethan Davis',
    authorImage: require('../assets/avatar1.png'),
  },
  { 
    id: 5,
    title: 'Biodiversity Conversation in Urban Environments',
    description: 'This project explores strategies for biodiversity conservation in urban environments, aiming to mitigate the impact of urbanization on ecological systems.',
    tags: [
      'Biodiversity', 
      'Conversation',
      'Urban Ecology',
      'Environmental Science',
    ],
    date: 'Jan 2024',
    author: 'Isabella Rodriguez',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 6,
    title: "Understanding Dark Energy's Role in Cosmology",
    description: "This research seeks to deepen our understanding of dark energy's role in cosmology and its implications for the evolution of the universe, using observational and theoretical approaches.",
    tags: [
      'Dark Energy', 
      'Cosmology',
      'Astrophysics',
    ],
    date: 'Aug 2023',
    author: 'Emily Parker',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 7,
    title: "Exploring Multiverse Theories in Cosmology",
    description: "This project delves into the fascinating realm of multiverse theories in cosmology, investigating the possibility of parallel universes and their implications for our understanding of the cosmos.",
    tags: [
      'Multiverse', 
      'Cosmology',
      'Theoretical Physics',
    ],
    date: 'Jun 2022',
    author: 'Emily Parker',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 8,
    title: "Cosmic Microwave Background Anomalies: Unraveling Mysteries",
    description: "This research aims to unravel the mysteries behind cosmic microwave background anomalies, providing insights into the early universe and the formation of cosmic structures.",
    tags: [
      'CMB Anomalies', 
      'Cosmology',
      'Observational Astronomy',
    ],
    date: 'Sep 2021',
    author: 'Liam Taylor',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 9,
    title: "Quantum Cosmology: Bridging Quantum Mechanics and the Cosmos",
    description: "This project explores the fascinating intersection of quantum mechanics and cosmology, aiming to develop a unified framework to describe the behavior of the universe at the smallest and largest scales.",
    tags: [
      'Quantum Cosmology', 
      'Quantum Mechanics',
      'Theoretical Physics',
    ],
    date: 'Dec 2020',
    author: 'Sophia Garcia',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 10,
    title: "Cosmological Constant Debate: Observational Insights",
    description: "This research investigates the cosmological constant debate by analyzing observational data, providing valuable insights into the nature of dark energy and its role in the expansion of the universe.",
    tags: [
      'Cosmological Constant', 
      'Dark Matter',
      'Observational Cosmology',
    ],
    date: 'Mar 2023',
    author: 'Daniel White',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 11,
    title: "Inflationary Universe Models: Assessing Viability",
    description: "This project assesses the viability of inflationary universe models in explaining the origin and structure of the cosmos, examining theoretical predictions and observational constraints.",
    tags: [
      'Inflationary Universe', 
      'Cosmology',
      'Theoretical Physics',
    ],
    date: 'Jul 2022',
    author: 'Daniel White',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 12,
    title: "Cosmic String Theory: Investigating Potential Signatures",
    description: "This research investigates cosmic string theory and its potential signatures in observational data, exploring the implications for our understanding of fundamental physics and the early universe.",
    tags: [
      'Cosmic Strings', 
      'String Theory',
      'Theoretical Physics',
    ],
    date: 'Nov 2021',
    author: 'Ava Turner',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 13,
    title: "Holographic Cosmology: Applying AdS/CFT Correspondence",
    description: "This project applies the AdS/CFT correspondence from theoretical physics to cosmology, exploring holographic descriptions of the universe and their implications for fundamental physics.",
    tags: [
      'Holographic Cosmology', 
      'Ads/CFT',
      'Theoretical Physics',
    ],
    date: 'Mar 2023',
    author: 'Daniel White',
    authorImage: require('../assets/avatar1.png'),
  },
  {
    id: 14,
    title: "Cosmic Neutrinos: Probing the Early Universe",
    description: "This research probes cosmic neutrinos to gain insights into the early universe, exploring their role in cosmology and particle physics and their potential as cosmic messengers.",
    tags: [
      'Cosmic Neutrinos', 
      'Early Universe',
      'Particle Physics',
    ],
    date: 'Oct 2023',
    author: 'Isabella Reed',
    authorImage: require('../assets/avatar1.png'),
  },
];

export const getIdeasData = () => {
  const ideasData = JSON.parse(localStorage.getItem('ideasData')) || [];
  return ideasData;
};

export default ideas;