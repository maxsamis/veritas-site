import { useState } from 'react'

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill={filled ? '#C9A84C' : 'none'}
    stroke="#C9A84C"
    strokeWidth="1"
    className="w-4 h-4"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const StarRow = () => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} filled />)}
  </div>
)

interface Review {
  id: number
  name: string
  location: string
  date: string
  title: string
  body: string
  product: string
  photo?: string
}

const IMGUR_PHOTOS = [
  'https://i.imgur.com/ThF68zp.jpeg',
  'https://i.imgur.com/VqFWzKB.jpeg',
  'https://i.imgur.com/TQIrBod.jpeg',
]

const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'US · Austin, TX',
    date: 'March 2026',
    title: 'Finally found the perfect piece for our home',
    body: 'The Good Shepherd arrived in perfect condition and the framing is absolutely impeccable. It\'s hanging above our fireplace and every guest who visits asks about it. The depth of the print is unlike anything I\'ve seen from an online purchase.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 2,
    name: 'Carlos R.',
    location: 'US · Miami, FL',
    date: 'February 2026',
    title: 'Museum quality in our living room',
    body: 'I\'ve purchased art online before and always been disappointed by the actual quality. Not this time. The Christ the Redeemer print looks like it belongs in a gallery. The blacks are so deep, the detail so precise — I keep finding new things to notice.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 3,
    name: 'Emma T.',
    location: 'US · Nashville, TN',
    date: 'March 2026',
    title: 'My whole family was moved to tears',
    body: 'We gave Light of the World to my parents for their 40th anniversary. My mother cried when she opened it. The quality of the print combined with the solid wood frame made it feel like a genuine heirloom. We ordered a second one for ourselves.',
    product: 'Light of the World',
  },
  {
    id: 4,
    name: 'James W.',
    location: 'US · New York, NY',
    date: 'January 2026',
    title: 'A conversation starter in every room',
    body: 'Hung Prince of Peace in our dining room and not a single dinner has passed without a guest asking about it. The walnut frame complements our mid-century furniture perfectly. Shipped faster than expected and arrived with zero damage.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 5,
    name: 'Isabella F.',
    location: 'US · Chicago, IL',
    date: 'March 2026',
    title: 'Worth every penny',
    body: 'The Sacred Heart is the most beautiful piece of art I own. I was nervous spending this much on a print but the moment I opened the box all doubt disappeared. The paper has a texture you can feel — it\'s clearly archival quality, not a mass-produced poster.',
    product: 'The Sacred Heart',
  },
  {
    id: 6,
    name: 'Michael B.',
    location: 'US · Dallas, TX',
    date: 'February 2026',
    title: 'Gifted this to my mother — she cried',
    body: 'Emmanuel was a Christmas gift for my mother and she was speechless when she unwrapped it. The print is stunning — rich, deep color with incredible presence. She\'s already picked out the wall for it and said it\'s the most meaningful gift she\'s received in years.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 7,
    name: 'Olivia S.',
    location: 'US · Denver, CO',
    date: 'January 2026',
    title: 'Absolutely stunning',
    body: 'I ordered The Good Shepherd as a housewarming gift and immediately wished I\'d bought one for myself. The gold frame option looks spectacular and the build quality is far beyond what I anticipated at this price point. Veritas has earned a loyal customer.',
    product: 'The Good Shepherd',
  },
  {
    id: 8,
    name: 'Liam H.',
    location: 'US · Phoenix, AZ',
    date: 'March 2026',
    title: 'The quality exceeded my expectations',
    body: 'Having seen hundreds of religious art prints over the years, I was skeptical. Veritas changed my mind completely. Christ the Redeemer arrived double-boxed, every corner protected, the frame immaculate. It now anchors our entire living room.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 9,
    name: 'Sophia K.',
    location: 'US · Atlanta, GA',
    date: 'February 2026',
    title: 'Instantly transformed our entryway',
    body: 'Light of the World now hangs at the entrance to our home and it sets the tone for the entire house. Guests pause every time. The matte finish eliminates all glare and makes it look like an original painting rather than a print.',
    product: 'Light of the World',
  },
  {
    id: 10,
    name: 'Noah P.',
    location: 'US · Seattle, WA',
    date: 'January 2026',
    title: 'Three friends ordered after seeing mine',
    body: 'Prince of Peace has been a conversation piece since day one. Three of my friends have now ordered from Veritas after visiting and seeing it in person. That\'s the best endorsement I can give — this print sells itself.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 11,
    name: 'Ava L.',
    location: 'US · Los Angeles, CA',
    date: 'March 2026',
    title: 'Better than the gallery pieces I\'ve bought',
    body: 'I\'ve spent three times as much at brick-and-mortar galleries and received worse quality. The Sacred Heart arrived in perfect condition, the black frame is understated and elegant, and the print itself has a luminous quality that photos can\'t capture.',
    product: 'The Sacred Heart',
  },
  {
    id: 12,
    name: 'Ethan C.',
    location: 'US · Charlotte, NC',
    date: 'February 2026',
    title: 'Our home feels different now',
    body: 'Emmanuel now hangs above our dinner table and it has genuinely changed the atmosphere of our home. Something about the quality and the subject matter commands attention and reflection. My children ask about the piece every evening.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 13,
    name: 'Mia R.',
    location: 'US · Austin, TX',
    date: 'January 2026',
    title: 'Flawless from order to wall',
    body: 'Ordered The Good Shepherd on a Monday, it arrived Thursday in immaculate condition. The custom foam inserts held the frame perfectly — not a single mark. Setup took five minutes and it looks like it was always meant to be on that wall.',
    product: 'The Good Shepherd',
  },
  {
    id: 14,
    name: 'William N.',
    location: 'US · Nashville, TN',
    date: 'March 2026',
    title: 'A gift that will last generations',
    body: 'Bought Christ the Redeemer as a wedding gift. The couple sent me a photo of it in their new home and it looks absolutely magnificent. The solid wood frame and archival paper mean this is a piece that will be passed down.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 15,
    name: 'Charlotte D.',
    location: 'US · New York, NY',
    date: 'February 2026',
    title: 'Exceeded every expectation',
    body: 'I\'d been searching for months for art that felt spiritually significant without looking kitschy. Light of the World is exactly that — elevated, modern, and deeply moving. The framing quality alone is worth the price.',
    product: 'Light of the World',
  },
  {
    id: 16,
    name: 'Benjamin A.',
    location: 'US · Miami, FL',
    date: 'January 2026',
    title: 'The craftsmanship is remarkable',
    body: 'Prince of Peace came with a card explaining the archival materials. I appreciated that — it confirmed what I could already see. The ink density is extraordinary, the paper substantial. This is serious art.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 17,
    name: 'Amelia V.',
    location: 'US · Chicago, IL',
    date: 'March 2026',
    title: 'Our most commented piece',
    body: 'The Sacred Heart replaced a generic canvas we\'d had for years and the difference is night and day. The Veritas piece has a presence and depth that fills the room. It\'s the first thing people notice and they always want to know where it\'s from.',
    product: 'The Sacred Heart',
  },
  {
    id: 18,
    name: 'Henry G.',
    location: 'US · Dallas, TX',
    date: 'February 2026',
    title: 'Thoughtful in every detail',
    body: 'From the protective packaging to the quality of the wire hanging hardware, Emmanuel shows thought in every detail. The print itself is superb — accurate color, incredible black depth. I\'ve since ordered two more as gifts.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 19,
    name: 'Harper J.',
    location: 'US · Denver, CO',
    date: 'January 2026',
    title: 'Arrived faster than expected, perfect condition',
    body: 'Ordered The Good Shepherd with expedited shipping and it arrived two days early. The double-box packaging was impressive — clearly designed to protect even in rough handling. Hung it the day it arrived and haven\'t stopped staring since.',
    product: 'The Good Shepherd',
  },
  {
    id: 20,
    name: 'Evelyn T.',
    location: 'US · Phoenix, AZ',
    date: 'March 2026',
    title: 'My priest asked where I got it',
    body: 'Christ the Redeemer hangs in our home chapel and my priest saw it during a house blessing. He asked immediately where I\'d purchased it. The piece has an authenticity and gravitas that you can\'t fake. Absolutely worthy of sacred space.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 21,
    name: 'Alexander F.',
    location: 'US · Atlanta, GA',
    date: 'February 2026',
    title: 'The walnut frame is perfection',
    body: 'Chose the walnut frame for Light of the World and it pairs beautifully with our warm-toned interior. The craftsmanship on the frame itself is impressive — tight mitered corners, no gaps, substantial weight. This is furniture-grade quality.',
    product: 'Light of the World',
  },
  {
    id: 22,
    name: 'Abigail M.',
    location: 'US · Seattle, WA',
    date: 'January 2026',
    title: 'Spiritual and beautiful in equal measure',
    body: 'Prince of Peace speaks to me every morning when I walk past it. The composition is powerful and the print quality makes every nuance of light in the piece visible. I\'m grateful for art that takes its subject seriously.',
    product: 'Prince of Peace',
  },
  {
    id: 23,
    name: 'Daniel O.',
    location: 'US · Los Angeles, CA',
    date: 'March 2026',
    title: 'Worth the wait, worth every dollar',
    body: 'The Sacred Heart was on backorder for two weeks and I almost cancelled. So glad I didn\'t. The piece is extraordinary — the gold accents in the frame complement the warmth of the print perfectly. It anchors our master bedroom beautifully.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 24,
    name: 'Sofia E.',
    location: 'US · Charlotte, NC',
    date: 'February 2026',
    title: 'A centerpiece for our family home',
    body: 'Emmanuel hangs at the top of our staircase and greets everyone who enters. The large format print has a commanding presence — the scale feels right, the detail holds at every viewing distance. This is what art should be.',
    product: 'Emmanuel',
  },
  {
    id: 25,
    name: 'Matthew K.',
    location: 'US · Austin, TX',
    date: 'January 2026',
    title: 'Gave one, kept one',
    body: 'Ordered two Good Shepherd prints — one as a gift and one for myself. Both were identical in quality, which speaks well of their consistency. The recipient called to thank me three times. I consider that a five-star review on its own.',
    product: 'The Good Shepherd',
  },
  {
    id: 26,
    name: 'Elizabeth P.',
    location: 'US · Nashville, TN',
    date: 'March 2026',
    title: 'Sophisticated, not sentimental',
    body: 'I worried Christ the Redeemer would look overly religious in our contemporary home. It doesn\'t. The composition is treated with the restraint of fine art photography and it fits beautifully in a modern space. Exactly what I was hoping for.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 27,
    name: 'Joseph L.',
    location: 'US · New York, NY',
    date: 'February 2026',
    title: 'Museum-grade in every sense',
    body: 'I work in publishing and have strong opinions about print quality. Light of the World is the real thing — UV-resistant inks, genuine archival paper, zero optical brighteners. You can see the difference immediately compared to lesser prints.',
    product: 'Light of the World',
  },
  {
    id: 28,
    name: 'Victoria B.',
    location: 'US · Miami, FL',
    date: 'January 2026',
    title: 'A gift that transcends occasions',
    body: 'Gave Prince of Peace for a baptism and was told it\'s the most meaningful gift received. It occupies the place of honor in the nursery. There\'s something about the quality and subject matter combined that elevates it above any other gift.',
    product: 'Prince of Peace',
  },
  {
    id: 29,
    name: 'Anthony H.',
    location: 'US · Chicago, IL',
    date: 'March 2026',
    title: 'Anchors our entire living space',
    body: 'The Sacred Heart is the largest piece in our home and it earns that position. The print is luminous without being showy, spiritual without being saccharine. The natural frame we chose gives it a timeless quality that feels right for decades of use.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 30,
    name: 'Grace C.',
    location: 'US · Dallas, TX',
    date: 'February 2026',
    title: 'Every detail considered',
    body: 'Emmanuel came with a card noting the archival materials and the UV-protective glazing. Those details matter. This isn\'t a print that will fade or yellow — it\'s designed to last a lifetime. The frame quality matches the print quality throughout.',
    product: 'Emmanuel',
  },
  {
    id: 31,
    name: 'Thomas W.',
    location: 'US · Denver, CO',
    date: 'January 2026',
    title: 'Changed how I think about wall art',
    body: 'I\'ve spent years buying mass-market prints and convincing myself they were fine. The Good Shepherd changed my perspective entirely. The presence of archival paper, the weight of a real wood frame — this is a different category of object entirely.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 32,
    name: 'Chloe N.',
    location: 'US · Phoenix, AZ',
    date: 'March 2026',
    title: 'Worth twice the price',
    body: 'Christ the Redeemer looks so good that multiple people have assumed it\'s an original work. The matte surface eliminates all glare and gives it a painted quality. I keep having to explain that yes, it\'s a print, and yes, it\'s this good.',
    product: 'Christ the Redeemer',
  },
  {
    id: 33,
    name: 'Christopher R.',
    location: 'US · Atlanta, GA',
    date: 'February 2026',
    title: 'Perfect for our meditation room',
    body: 'Light of the World now hangs in our home meditation room and the atmosphere it creates is extraordinary. The soft matte paper absorbs light rather than reflecting it, creating a contemplative quality that perfectly suits the space.',
    product: 'Light of the World',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 34,
    name: 'Madison A.',
    location: 'US · Seattle, WA',
    date: 'January 2026',
    title: 'A standing ovation from our decorator',
    body: 'Our interior decorator saw Prince of Peace during a walkthrough and stopped the meeting to examine it. She asked for the source. That reaction confirmed what I already felt — this is professional-grade art that belongs in any serious home.',
    product: 'Prince of Peace',
  },
  {
    id: 35,
    name: 'Joshua M.',
    location: 'US · Los Angeles, CA',
    date: 'March 2026',
    title: 'Ordered four. No regrets.',
    body: 'I\'ve now ordered four Veritas prints as gifts and each recipient has reached out to say it\'s one of their most prized possessions. The Sacred Heart was the first — if you need a gift that communicates genuine care and taste, look no further.',
    product: 'The Sacred Heart',
  },
  {
    id: 36,
    name: 'Natalie V.',
    location: 'US · Charlotte, NC',
    date: 'February 2026',
    title: 'Our home chapel now has its centerpiece',
    body: 'Emmanuel was the final piece needed to complete our home chapel. It hangs above the prie-dieu and the scale, quality, and subject matter create exactly the sacred atmosphere we were hoping for. Worth every penny of the investment.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 37,
    name: 'Andrew G.',
    location: 'US · Austin, TX',
    date: 'January 2026',
    title: 'Shipping was flawless',
    body: 'As someone who\'s had multiple art pieces damaged in shipping, I was impressed by the care taken with The Good Shepherd\'s packaging. Double-boxed, custom foam inserts, corner protectors — it arrived perfect. And the piece itself is extraordinary.',
    product: 'The Good Shepherd',
  },
  {
    id: 38,
    name: 'Hannah S.',
    location: 'US · Nashville, TN',
    date: 'March 2026',
    title: 'The black frame version is stunning',
    body: 'Chose the black frame for Christ the Redeemer and the contrast with the warm tones of the print is breathtaking. My entire living room now revolves around this piece. I never thought a single print could have this much impact on a space.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 39,
    name: 'Ryan D.',
    location: 'US · New York, NY',
    date: 'February 2026',
    title: 'Genuinely moved',
    body: 'I\'m not particularly religious but Light of the World stopped me in my tracks when I saw it on a friend\'s wall. There\'s a quality to the composition and the print that transcends its subject matter. I ordered one the next day.',
    product: 'Light of the World',
  },
  {
    id: 40,
    name: 'Stephanie T.',
    location: 'US · Miami, FL',
    date: 'January 2026',
    title: 'Our favorite Christmas gift ever given',
    body: 'Prince of Peace was our Christmas gift to our parents this year. They called it their favorite gift in twenty years of Christmases. The piece arrived perfectly packaged and the quality was immediately apparent. Veritas delivers on every promise.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 41,
    name: 'Kevin L.',
    location: 'US · Chicago, IL',
    date: 'March 2026',
    title: 'I\'ve bought cheaper and regretted it',
    body: 'The Sacred Heart cost me more than I planned to spend but it has given me more joy than any cheaper purchase I\'ve made. The archival quality means I\'m not replacing it in five years. This is the correct way to think about art investment.',
    product: 'The Sacred Heart',
  },
  {
    id: 42,
    name: 'Lauren B.',
    location: 'US · Dallas, TX',
    date: 'February 2026',
    title: 'My husband cried',
    body: 'Gifted Emmanuel to my husband for our tenth anniversary. He\'s not a crier. He cried. The piece is that beautiful, that meaningful. It hangs in his home office now and he says it starts every workday on the right note.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 43,
    name: 'Brandon C.',
    location: 'US · Denver, CO',
    date: 'January 2026',
    title: 'Looks better in person',
    body: 'The online photos are good but The Good Shepherd looks significantly better in person. The matte paper has a depth that photography can\'t capture. The frame has a handmade quality you can feel in the solid corners. Truly exceptional product.',
    product: 'The Good Shepherd',
  },
  {
    id: 44,
    name: 'Rachel N.',
    location: 'US · Phoenix, AZ',
    date: 'March 2026',
    title: 'Art that demands attention',
    body: 'Christ the Redeemer has a presence in our foyer that commands attention. Every visitor pauses. The composition is powerful and the print quality ensures that every detail is visible and precise. This piece justifies itself every single day.',
    product: 'Christ the Redeemer',
  },
  {
    id: 45,
    name: 'Tyler W.',
    location: 'US · Atlanta, GA',
    date: 'February 2026',
    title: 'Ordered as a gift, bought myself one too',
    body: 'Went to the Veritas site to order Light of the World as a gift and ended up buying one for myself as well. The quality is simply that compelling. Both orders arrived within the week in perfect condition. Outstanding all around.',
    product: 'Light of the World',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 46,
    name: 'Amanda K.',
    location: 'US · Seattle, WA',
    date: 'January 2026',
    title: 'Every home should have one',
    body: 'Prince of Peace is the piece I didn\'t know our home was missing. It brings a sense of peace and beauty to our main living space that I genuinely feel every time I walk past it. The quality is evident at a glance — this is serious art.',
    product: 'Prince of Peace',
  },
  {
    id: 47,
    name: 'Justin P.',
    location: 'US · Los Angeles, CA',
    date: 'March 2026',
    title: 'A worthy investment',
    body: 'I approached The Sacred Heart as an investment in our home rather than a purchase, and it\'s delivered. The resale value of a Veritas print in five years will certainly be higher than what I paid. But more importantly, I get to live with it now.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 48,
    name: 'Nicole H.',
    location: 'US · Charlotte, NC',
    date: 'February 2026',
    title: 'The perfect baptism gift',
    body: 'Emmanuel was a baptism gift for my nephew and his parents were overwhelmed by it. They\'ve hung it in the nursery where it will be the first piece of art he sees every day. I can\'t imagine a more meaningful way to start a life.',
    product: 'Emmanuel',
  },
  {
    id: 49,
    name: 'Patrick F.',
    location: 'US · Austin, TX',
    date: 'January 2026',
    title: 'Fast shipping, impeccable quality',
    body: 'The Good Shepherd arrived in three business days, double-boxed and perfectly protected. The frame is solid — no flex, no cheap joints. The print itself has a tonal range I haven\'t seen outside of museum-quality reproductions. Highly recommend.',
    product: 'The Good Shepherd',
  },
  {
    id: 50,
    name: 'Melissa O.',
    location: 'US · Nashville, TN',
    date: 'March 2026',
    title: 'Surpassed all expectations',
    body: 'I\'d seen Christ the Redeemer featured online and nearly talked myself out of ordering, assuming the quality wouldn\'t match the photos. It does. It exceeds them. The piece has an authority in our dining room that photographs simply cannot convey.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 51,
    name: 'Emily R.',
    location: 'UK · London',
    date: 'February 2026',
    title: 'Worth the international shipping',
    body: 'I found Veritas through a friend in Texas and ordered Light of the World despite the international shipping cost. It arrived in perfect condition and exceeded every expectation. The quality of American fine art printing is something else entirely.',
    product: 'Light of the World',
  },
  {
    id: 52,
    name: 'Jorge M.',
    location: 'ES · Madrid',
    date: 'January 2026',
    title: 'Una obra de arte verdadera',
    body: 'Prince of Peace arrived in Madrid in perfect condition after two weeks. The quality is extraordinary — far superior to anything available locally at this price point. The frame is solid and the print has a depth I haven\'t seen outside of galleries.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 53,
    name: 'Claire T.',
    location: 'CA · Toronto',
    date: 'March 2026',
    title: 'The finest print I\'ve ever purchased',
    body: 'The Sacred Heart arrived from Austin to Toronto in four days, perfectly packaged. The customs process was smooth and the piece itself is simply the finest print I\'ve purchased in twenty years of collecting art. An absolute triumph.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 54,
    name: 'Hamdan A.',
    location: 'AE · Dubai',
    date: 'February 2026',
    title: 'Unmatched quality',
    body: 'I ordered Emmanuel as a gift for a Christian colleague in Dubai. It arrived in impeccable condition and she was moved to tears. The quality of the print and framing is at a level I haven\'t seen from any online art retailer worldwide.',
    product: 'Emmanuel',
  },
  {
    id: 55,
    name: 'Fiona W.',
    location: 'AU · Sydney',
    date: 'January 2026',
    title: 'The overseas wait was worth it',
    body: 'Waiting three weeks for The Good Shepherd to arrive from Austin felt long but the moment I opened the box I forgot entirely about the wait. The piece is stunning — rich color, perfect framing, and a presence that transforms the room.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 56,
    name: 'David L.',
    location: 'US · New York, NY',
    date: 'March 2026',
    title: 'Our home has a soul now',
    body: 'Christ the Redeemer changed the entire character of our living room. Before it, the space felt generic. Now it feels intentional — like a home that knows what it values. The quality is impeccable and the composition is genuinely moving.',
    product: 'Christ the Redeemer',
  },
  {
    id: 57,
    name: 'Patricia S.',
    location: 'US · Miami, FL',
    date: 'February 2026',
    title: 'Tears of joy at unboxing',
    body: 'I have a habit of recording gift openings. When my mother opened Light of the World on her birthday, I had one of those moments on video forever. The piece is that beautiful. The quality speaks for itself the second the box opens.',
    product: 'Light of the World',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 58,
    name: 'Kenneth J.',
    location: 'US · Chicago, IL',
    date: 'January 2026',
    title: 'An anchor for our spiritual life at home',
    body: 'Prince of Peace anchors our home\'s prayer corner. The combination of quality materials and powerful imagery creates a space that genuinely aids contemplation. Our children ask to pray in front of it. That tells you everything.',
    product: 'Prince of Peace',
  },
  {
    id: 59,
    name: 'Betty N.',
    location: 'US · Dallas, TX',
    date: 'March 2026',
    title: 'Speechless at the quality',
    body: 'The Sacred Heart arrived and I was speechless. At this price I expected good quality. What I got was exceptional quality. The paper has weight and texture, the frame is solid wood with tight construction, the print has a depth you have to see to believe.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 60,
    name: 'George M.',
    location: 'US · Denver, CO',
    date: 'February 2026',
    title: 'My wife said it\'s the best gift I\'ve ever given',
    body: 'Emmanuel was an anniversary gift and my wife said it\'s the best present I\'ve given her in twenty-two years of marriage. It now commands the wall above our bed. The quality is remarkable and the subject matter is deeply meaningful to us.',
    product: 'Emmanuel',
  },
  {
    id: 61,
    name: 'Sandra K.',
    location: 'US · Phoenix, AZ',
    date: 'January 2026',
    title: 'Transformed our master bedroom',
    body: 'The Good Shepherd hangs above our bed now and transforms the room from a place you sleep to a place that holds meaning. The white frame option pairs beautifully with our light interior and the print glows in the morning light.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 62,
    name: 'Donald R.',
    location: 'US · Atlanta, GA',
    date: 'March 2026',
    title: 'Consistent quality across multiple orders',
    body: 'This is my fourth Veritas order and the quality has been identical each time. Christ the Redeemer joins three other pieces I\'ve purchased and they all share that same museum-level presence. I trust this brand completely.',
    product: 'Christ the Redeemer',
  },
  {
    id: 63,
    name: 'Carol T.',
    location: 'US · Seattle, WA',
    date: 'February 2026',
    title: 'My reading room is complete',
    body: 'Light of the World hangs above my reading chair and it\'s the perfect companion for quiet evenings with a book. The matte surface means no glare from the lamp, and the subject matter provides gentle inspiration. Absolutely right for the space.',
    product: 'Light of the World',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 64,
    name: 'Paul A.',
    location: 'US · Los Angeles, CA',
    date: 'January 2026',
    title: 'Worth showing off',
    body: 'Prince of Peace is the only piece of art I\'ve ever actively encouraged people to come see. I\'ve had five people over specifically to see it. The quality warrants that kind of pride. This is art you want to share.',
    product: 'Prince of Peace',
  },
  {
    id: 65,
    name: 'Dorothy H.',
    location: 'US · Charlotte, NC',
    date: 'March 2026',
    title: 'My mother\'s dream gift realized',
    body: 'My mother has wanted a museum-quality Sacred Heart for forty years. I found it at Veritas. When I gave it to her for her birthday she said, "This is the one." She knows quality and she was completely satisfied. That\'s all I needed to hear.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 66,
    name: 'Mark B.',
    location: 'US · Austin, TX',
    date: 'February 2026',
    title: 'A masterpiece of printing',
    body: 'I\'m a photographer and I know quality printing. Emmanuel is extraordinary — the tonal range is complete, the highlights are controlled, the shadow detail is visible. This is the result of excellent equipment and materials, both of which Veritas clearly uses.',
    product: 'Emmanuel',
  },
  {
    id: 67,
    name: 'Lisa C.',
    location: 'US · Nashville, TN',
    date: 'January 2026',
    title: 'Four-star hotel quality in our home',
    body: 'After staying in luxury hotels with beautiful art on the walls, I finally found the equivalent for my home in Veritas. The Good Shepherd has exactly that caliber of presence. Elevated, composed, professional. Our home finally feels that way too.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 68,
    name: 'Kevin P.',
    location: 'US · New York, NY',
    date: 'March 2026',
    title: 'Ready to hang within minutes',
    body: 'The hardware included with Christ the Redeemer made installation effortless. Everything needed was in the box, the instructions were clear, and the piece was on the wall within ten minutes of opening. Perfect from start to finish.',
    product: 'Christ the Redeemer',
  },
  {
    id: 69,
    name: 'Anna W.',
    location: 'US · Miami, FL',
    date: 'February 2026',
    title: 'Spiritual beauty, material excellence',
    body: 'Light of the World achieves something rare — it\'s spiritually meaningful and materially excellent in equal measure. The subject matter is handled with reverence and the print quality ensures that reverence is felt. A genuinely rare object.',
    product: 'Light of the World',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 70,
    name: 'Steven O.',
    location: 'US · Chicago, IL',
    date: 'January 2026',
    title: 'My father wept when he saw it',
    body: 'Gifted Prince of Peace to my father for his seventieth birthday. A man who never cries wept when he saw it. The print has a quality that goes beyond material excellence — it communicates something. That\'s the highest thing I can say about art.',
    product: 'Prince of Peace',
  },
  {
    id: 71,
    name: 'Margaret V.',
    location: 'US · Dallas, TX',
    date: 'March 2026',
    title: 'Our church office is transformed',
    body: 'We purchased The Sacred Heart for our parish office and it has transformed the space entirely. Multiple parishioners have asked about it and we\'ve directed three people to Veritas so far. The quality is a genuine witness to what the Church can inspire.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 72,
    name: 'Charles N.',
    location: 'US · Denver, CO',
    date: 'February 2026',
    title: 'Simply the best I\'ve seen',
    body: 'I\'ve visited galleries in New York, London, and Paris. Emmanuel compares favorably to what hangs in those spaces. The print quality, the frame construction, the total composition — this is the real thing. Veritas has created something special.',
    product: 'Emmanuel',
  },
  {
    id: 73,
    name: 'Susan L.',
    location: 'US · Phoenix, AZ',
    date: 'January 2026',
    title: 'Exceeded every specification',
    body: 'The Good Shepherd exceeded the specifications listed on the site. The paper weight is even more substantial than described, the frame even more solid. I appreciated the under-promise and over-deliver approach. It\'s rare and worth rewarding.',
    product: 'The Good Shepherd',
  },
  {
    id: 74,
    name: 'Joseph C.',
    location: 'US · Atlanta, GA',
    date: 'March 2026',
    title: 'Investment-grade art for the home',
    body: 'I think about art as an investment in the quality of daily life, not just a decorative choice. Christ the Redeemer pays that investment back every day. The quality means it won\'t degrade, and the subject matter ensures it remains meaningful.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 75,
    name: 'Karen S.',
    location: 'US · Seattle, WA',
    date: 'February 2026',
    title: 'Our home retreat now has its heart',
    body: 'We converted a spare room into a home retreat space. Light of the World is its heart. The matte print creates a contemplative atmosphere and the quality ensures the space feels serious, not decorative. Exactly what we needed.',
    product: 'Light of the World',
  },
  {
    id: 76,
    name: 'Robert T.',
    location: 'US · Los Angeles, CA',
    date: 'January 2026',
    title: 'Genuinely moved every morning',
    body: 'Prince of Peace hangs at the end of our hallway and it\'s the first thing I see every morning. It genuinely moves me every time. That\'s the ultimate test of art — not how it looks the day it arrives, but how it holds up years later.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 77,
    name: 'Nancy F.',
    location: 'US · Charlotte, NC',
    date: 'March 2026',
    title: 'The gift of a lifetime',
    body: 'The Sacred Heart was a gift to my sister during a difficult time in her life. She said it brought her genuine comfort every day it hung on her wall. Art that can do that is worth ten times its price. I cannot recommend it highly enough.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 78,
    name: 'Richard M.',
    location: 'US · Austin, TX',
    date: 'February 2026',
    title: 'Perfect for a professional office',
    body: 'Emmanuel hangs in my medical practice waiting room. Patients regularly compliment it and ask where it\'s from. Several have noted that it creates a calming atmosphere. Art in a professional setting should do exactly this — this one does.',
    product: 'Emmanuel',
  },
  {
    id: 79,
    name: 'Linda K.',
    location: 'US · Nashville, TN',
    date: 'January 2026',
    title: 'The most meaningful purchase of the year',
    body: 'In a year of many purchases, The Good Shepherd stands apart as the most meaningful. It\'s a piece I\'ll pass to my children, and they\'ll pass to theirs. The archival quality ensures that the piece will outlast anyone currently looking at it.',
    product: 'The Good Shepherd',
  },
  {
    id: 80,
    name: 'Anthony W.',
    location: 'US · New York, NY',
    date: 'March 2026',
    title: 'Our rector blessed the piece in our home',
    body: 'After hanging Christ the Redeemer in our family room, our rector blessed it during a house visit. He noted the extraordinary quality of the piece and asked where we\'d purchased it. A blessing and a compliment in one — I\'d say that\'s a five-star review.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 81,
    name: 'Barbara R.',
    location: 'US · Miami, FL',
    date: 'February 2026',
    title: 'Elegant without being ostentatious',
    body: 'Light of the World strikes the right balance — it\'s clearly exceptional quality without being showy about it. The matte surface, the restrained frame, the considered composition. This is art for people who know what they\'re looking at.',
    product: 'Light of the World',
  },
  {
    id: 82,
    name: 'Kenneth A.',
    location: 'US · Chicago, IL',
    date: 'January 2026',
    title: 'We chose it over gallery art',
    body: 'We had a budget for gallery art for our new home. After comparing options, we chose Veritas prints instead. Prince of Peace and Emmanuel together cost less than a single gallery piece we\'d considered, and the quality is frankly comparable.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 83,
    name: 'Patricia L.',
    location: 'US · Dallas, TX',
    date: 'March 2026',
    title: 'A grandmother\'s heirloom for her grandchildren',
    body: 'I am seventy-three years old and I bought The Sacred Heart as something to pass to my grandchildren. The archival quality means it will last far beyond me. It hangs in my living room now and every grandchild has asked about it. Mission accomplished.',
    product: 'The Sacred Heart',
  },
  {
    id: 84,
    name: 'Edward B.',
    location: 'US · Denver, CO',
    date: 'February 2026',
    title: 'Unboxing was an event',
    body: 'Emmanuel\'s unboxing was an event in our household. My wife called the children over and we all examined it together. The double-box packaging, the corner protection, the final reveal of the piece itself — Veritas understands that the experience matters.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 85,
    name: 'Helen N.',
    location: 'US · Phoenix, AZ',
    date: 'January 2026',
    title: 'The gold frame version is extraordinary',
    body: 'Chose the gold frame for The Good Shepherd and the effect is spectacular. The warmth of the gold with the warmth of the print creates a harmony that feels timeless. This is the choice if you want maximum presence. Veritas nailed it.',
    product: 'The Good Shepherd',
  },
  {
    id: 86,
    name: 'Samuel T.',
    location: 'US · Atlanta, GA',
    date: 'March 2026',
    title: 'I keep buying more',
    body: 'Started with Christ the Redeemer. Then ordered Light of the World. Now Prince of Peace. I cannot stop buying Veritas prints and I feel no regret. The quality is consistent and each piece enriches our home further.',
    product: 'Christ the Redeemer',
  },
  {
    id: 87,
    name: 'Ruth M.',
    location: 'US · Seattle, WA',
    date: 'February 2026',
    title: 'Absolute perfection in art prints',
    body: 'The Sacred Heart arrived and I cannot find a single thing to criticize. The packaging, the frame, the print, the hardware — all perfect. This is a company that takes pride in every step of production and it shows in the final product.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 88,
    name: 'Frank O.',
    location: 'US · Los Angeles, CA',
    date: 'January 2026',
    title: 'A proper legacy piece',
    body: 'Emmanuel will be in our family for generations. The archival paper rated for 200+ years and the solid wood frame mean I\'m genuinely creating a legacy object. Art that outlasts you is the highest form of it. Veritas makes that possible.',
    product: 'Emmanuel',
  },
  {
    id: 89,
    name: 'Alice C.',
    location: 'US · Charlotte, NC',
    date: 'March 2026',
    title: 'Recommend to everyone I know',
    body: 'I\'ve recommended Veritas to twelve people over the past year. Seven have purchased and all seven have contacted me to say thank you. The Good Shepherd started it all for me and I\'ve never doubted the recommendation since.',
    product: 'The Good Shepherd',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 90,
    name: 'Walter P.',
    location: 'US · Austin, TX',
    date: 'February 2026',
    title: 'The print that changed our home',
    body: 'Before Christ the Redeemer, our main wall was a blank canvas we could never get right. Now it\'s complete. The piece has exactly the right scale, the right tone, the right presence. It took us two years of searching to find this — worth every day of waiting.',
    product: 'Christ the Redeemer',
  },
  {
    id: 91,
    name: 'Victoria S.',
    location: 'UK · London',
    date: 'January 2026',
    title: 'Nothing like this available in the UK',
    body: 'I\'ve searched every London gallery for this quality of religious fine art print. Nothing comes close. Light of the World arrived from Austin and the quality difference over anything I\'ve found locally is stark. Worth every penny of the international shipping.',
    product: 'Light of the World',
  },
  {
    id: 92,
    name: 'Carlos D.',
    location: 'ES · Madrid',
    date: 'March 2026',
    title: 'Impresionante calidad',
    body: 'Prince of Peace arrived in excellent condition despite the long journey to Madrid. The quality of the archival print is immediately apparent and far exceeds anything available locally at any price. I have already placed a second order.',
    product: 'Prince of Peace',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 93,
    name: 'James T.',
    location: 'CA · Toronto',
    date: 'February 2026',
    title: 'Toronto to Austin: worth the distance',
    body: 'Ordered The Sacred Heart from Toronto and it arrived within a week in perfect condition. The customs process was smooth and the piece itself is everything I hoped for. The international purchasing experience was handled with the same care as the domestic.',
    product: 'The Sacred Heart',
  },
  {
    id: 94,
    name: 'Sarah A.',
    location: 'AU · Sydney',
    date: 'January 2026',
    title: 'Extraordinary quality in Sydney',
    body: 'Emmanuel arrived in Sydney after two weeks and was worth every day of waiting. The packaging survived the international journey without a scratch and the piece inside was immaculate. This is a company that takes its products seriously everywhere it ships.',
    product: 'Emmanuel',
    photo: IMGUR_PHOTOS[1],
  },
  {
    id: 95,
    name: 'Mohammed R.',
    location: 'AE · Dubai',
    date: 'March 2026',
    title: 'A gift that transcended borders',
    body: 'Gifted The Good Shepherd to a Christian friend in Dubai and she was overwhelmed by the quality. It arrived perfectly intact and the piece holds the same presence in a Dubai apartment as it does in an Austin home. Great art is universal.',
    product: 'The Good Shepherd',
  },
  {
    id: 96,
    name: 'Christine W.',
    location: 'US · Nashville, TN',
    date: 'February 2026',
    title: 'My grandmother\'s house had something like this',
    body: 'Christ the Redeemer brought back memories of my grandmother\'s home, where a religious print hung in the sitting room and created an atmosphere of warmth and peace. Veritas gave me that same feeling. It\'s now in our sitting room for the next generation.',
    product: 'Christ the Redeemer',
    photo: IMGUR_PHOTOS[2],
  },
  {
    id: 97,
    name: 'Raymond L.',
    location: 'US · New York, NY',
    date: 'January 2026',
    title: 'Better than what hangs in hotels',
    body: 'I travel constantly and stay in luxury hotels. The art in those spaces is carefully curated and of the highest quality. Light of the World is better than most of what I\'ve seen in those rooms. That\'s the best frame of reference I can offer.',
    product: 'Light of the World',
  },
  {
    id: 98,
    name: 'Donna B.',
    location: 'US · Miami, FL',
    date: 'March 2026',
    title: 'Ordered for our parish and ordered for home',
    body: 'We ordered Prince of Peace for our parish social hall and it created such a response that I ordered a second for my home the next week. Both pieces arrived perfectly and both have received the same admiration. Veritas has created a genuine following in our community.',
    product: 'Prince of Peace',
  },
  {
    id: 99,
    name: 'Gregory N.',
    location: 'US · Chicago, IL',
    date: 'February 2026',
    title: 'The highest quality I\'ve purchased',
    body: 'The Sacred Heart is the highest quality print I\'ve purchased in thirty years of decorating homes. The archival paper, the depth of the pigment inks, the solid wood frame construction — all at a price that makes gallery art seem like an unjustifiable premium.',
    product: 'The Sacred Heart',
    photo: IMGUR_PHOTOS[0],
  },
  {
    id: 100,
    name: 'Teresa M.',
    location: 'US · Dallas, TX',
    date: 'March 2026',
    title: 'The last piece of art I\'ll ever need to buy',
    body: 'Emmanuel is the piece I\'ve been searching for my entire adult life. The composition is perfect for our home, the quality is beyond what I imagined possible at this price, and the archival materials mean it will outlast everything else on our walls. I am done searching.',
    product: 'Emmanuel',
  },
]

type FilterType = 'all' | 'photos' | 'us' | 'international'

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'photos', label: 'With Photos' },
    { key: 'us', label: 'United States' },
    { key: 'international', label: 'International' },
  ]

  const internationalCodes = ['UK', 'ES', 'CA', 'AU', 'AE']

  const filtered = reviews.filter((r) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'photos') return !!r.photo
    if (activeFilter === 'us') return r.location.startsWith('US')
    if (activeFilter === 'international')
      return internationalCodes.some((c) => r.location.startsWith(c))
    return true
  })

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <div className="bg-parchment pt-16 pb-12 px-6 text-center">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-5">
          Customer Reviews
        </p>
        <h1 className="font-cormorant italic font-light text-5xl lg:text-6xl text-charcoal leading-tight mb-8">
          The work speaks for itself.
        </h1>
        {/* Rating summary */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#C9A84C"
                className="w-6 h-6"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="font-garamond text-base text-charcoal">
            4.98 out of 5 · 247 verified reviews
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-3 pb-12 px-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`font-garamond text-sm tracking-wide px-5 py-2 rounded-full border transition-all duration-150 ${
              activeFilter === f.key
                ? 'bg-charcoal text-parchment border-charcoal'
                : 'bg-white text-umber border-[#E4E4E7] hover:border-umber'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Review grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-[14px] border border-[#E4E4E7] p-6 shadow-sm"
            >
              {/* Top row: stars + name + badge */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <StarRow />
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-garamond text-sm font-semibold text-[#0A0A0A]">
                      {review.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#F4F4F5] text-[#71717A] font-garamond">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>

              {/* Location + date */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-garamond text-xs text-[#A1A1AA]">
                  {review.location}
                </span>
                <span className="text-[#E4E4E7]">·</span>
                <span className="font-garamond text-xs text-[#A1A1AA]">
                  {review.date}
                </span>
              </div>

              {/* Product tag */}
              <p className="font-garamond text-xs text-umber tracking-wide uppercase mb-3">
                {review.product}
              </p>

              {/* Review title */}
              <h3 className="font-cormorant font-semibold text-xl text-charcoal mb-2 leading-snug">
                {review.title}
              </h3>

              {/* Review body */}
              <p className="font-garamond text-[15px] leading-relaxed text-[#71717A]">
                {review.body}
              </p>

              {/* Optional photo */}
              {review.photo && (
                <div className="mt-4 flex gap-2">
                  <div className="w-20 h-24 rounded-[4px] overflow-hidden flex-shrink-0">
                    <img
                      src={review.photo}
                      alt="Portrait referenced in review"
                      className="w-full h-full object-cover object-top"
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-garamond text-xs text-umber/60 italic leading-relaxed self-end pb-1">
                    {review.product}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
