import Review from './Review'

const reviews = [
  { name: 'Alice Johnson', review: 'A game-changer for our admin team!!',  imageUrl: '/Headshot1.png' },
  { name: 'Bob Smith', review: 'Really streamlined my workflow.',  imageUrl: '/Headshot2.png' },
  { name: 'Dana White', review: 'Amazing features and easy to use.',  imageUrl: '/Headshot3.png' },
  { name: 'Dave Brown', review: 'Love the user interface!',  imageUrl: '/Headshot4.png' },
]

export default function UserReviews() {
  return (
    <div className="p-8 mx-0 lg:mx-14 ">
      <h3 className="text-2xl font-bold text-center mb-6 text-slate-500">What Our Users Say</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <Review 
            key={index} 
            name={review.name} 
            review={review.review} 
            imageUrl={review.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
