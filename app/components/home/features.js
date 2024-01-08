import { FaRocket, FaMobileAlt, FaFileAlt , FaUserFriends } from 'react-icons/fa'
import Feature from './feature'

const features = [
  {
    title: 'Fast Performance',
    description: 'Instant realtime data and saving, no more waiting on long load times.',
    Icon: FaRocket
  },

  {
    title: 'View Files In Record',
    description: 'No more downloding customer data to view it, open it without closing the app.',
    Icon: FaFileAlt
  },
  {
    title: 'Add new team members as you need',
    description: 'Add as many team members to your system as you need.',
    Icon: FaUserFriends
  },
  {
    title: 'Mobile Friendly',
    description: 'Fully responsive design that works on any device.',
    Icon: FaMobileAlt
  },
]

export default function Features() {
  return (
    <div className="p-8 mx-0 lg:mx-14">
      <h3 className="text-2xl font-bold text-center mb-16">Our Key Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {features.map((feature, index) => (
          <Feature
            key={index}
            Icon={feature.Icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
}
