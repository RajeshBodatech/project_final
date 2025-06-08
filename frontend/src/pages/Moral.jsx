import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const stories = [
  {
    id: 1,
    title: {
      en: "The Butterfly's Journey",
      te: "సీతాకోకచిలుక ప్రయాణం"
    },
    content: {
      en: `A man found a cocoon of a butterfly. One day, a small opening appeared. He sat and watched the butterfly for several hours as it struggled to force its body through that little hole. Then it seemed to stop making any progress. It appeared as if it had gotten as far as it could, and it could go no further.

So the man decided to help the butterfly. He took a pair of scissors and snipped off the remaining bit of the cocoon. The butterfly then emerged easily. But it had a swollen body and small, shriveled wings.

The man continued to watch the butterfly because he expected that, at any moment, the wings would enlarge and expand to be able to support the body, which would contract in time. Neither happened! In fact, the butterfly spent the rest of its life crawling around with a swollen body and shriveled wings. It never was able to fly.

What the man, in his kindness and haste, did not understand was that the restricting cocoon and the struggle required for the butterfly to get through the tiny opening were nature's way of forcing fluid from the body of the butterfly into its wings so that it would be ready for flight once it achieved its freedom from the cocoon.

Sometimes struggles are exactly what we need in our lives. If nature allowed us to go through our lives without any obstacles, it would cripple us. We would not be as strong as what we could have been. And we could never fly.`,
      te: `ఒక మనిషి సీతాకోకచిలుక గూడును కనుగొన్నాడు. ఒక రోజు, దానిలో ఒక చిన్న రంధ్రం కనిపించింది. అతను చాలా గంటలు సీతాకోకచిలుక ఆ రంధ్రం గుండా బయటకు రావడానికి ప్రయత్నించడాన్ని చూశాడు. తర్వాత అది ఆగిపోయినట్లు కనిపించింది. అది ఎంతో ప్రయత్నించి ఇక ముందుకు వెళ్ళలేకపోయింది.

కనుక ఆ మనిషి సీతాకోకచిలుకకు సహాయం చేయాలనుకున్నాడు. అతను కత్తెరతో మిగిలిన గూడు భాగాన్ని తెగేసాడు. సీతాకోకచిలుక తేలికగా బయటకు వచ్చింది. కానీ దాని శరీరం ఉబ్బి, రెక్కలు చిన్నవిగా, ముడుచుకుపోయి ఉన్నాయి.

ఆ మనిషి సీతాకోకచిలుకను చూస్తూనే ఉన్నాడు, ఎందుకంటే ఎప్పుడైనా రెక్కలు పెరిగి శరీరాన్ని మోయగలిగేలా ఉంటాయని అతను భావించాడు. కానీ అలా జరగలేదు! నిజానికి, సీతాకోకచిలుక మిగతా జీవితాన్ని ఉబ్బిన శరీరంతో, ముడుచుకుపోయిన రెక్కలతో నడుస్తూ గడిపింది. అది ఎప్పుడూ ఎగరలేకపోయింది.

ఆ మనిషి తన దయ మరియు తొందరలో అర్థం చేసుకోలేదు - సీతాకోకచిలుక ఆ చిన్న రంధ్రం గుండా వెళ్ళడానికి అవసరమైన పోరాటం, అది గూడు నుండి విముక్తి పొందిన తర్వాత ఎగరడానికి సిద్ధంగా ఉండేలా దాని శరీరం నుండి ద్రవాన్ని రెక్కలలోకి నెట్టడానికి ప్రకృతి మార్గం.

కొన్నిసార్లు మన జీవితాలలో పోరాటాలు మనకు అవసరమైనవే. ప్రకృతి మనకు ఎటువంటి అడ్డంకులు లేకుండా జీవితాన్ని గడపడానికి అనుమతించినట్లయితే, అది మనల్ని వికలాంగులను చేసేది. మనం ఉండగలిగినంత బలంగా ఉండేవారం కాదు. మరియు మనం ఎప్పుడూ ఎగరలేకపోయేవారం.`
    },
    moral: {
      en: "The struggles we face make us stronger and prepare us for the journey ahead.",
      te: "మనం ఎదుర్కొనే పోరాటాలు మనల్ని బలంగా చేసి, ముందున్న ప్రయాణానికి సిద్ధం చేస్తాయి."
    }
  },
  {
    id: 2,
    title: {
      en: "The Two Wolves",
      te: "రెండు తోడేళ్ళు"
    },
    content: {
      en: `An old Cherokee was teaching his grandson about life. "A fight is going on inside me," he said to the boy. "It is a terrible fight and it is between two wolves. One is evil - he is anger, envy, sorrow, regret, greed, arrogance, self-pity, guilt, resentment, inferiority, lies, false pride, superiority, and ego.

He continued, "The other is good - he is joy, peace, love, hope, serenity, humility, kindness, benevolence, empathy, generosity, truth, compassion, and faith. The same fight is going on inside you - and inside every other person, too."

The grandson thought about it for a minute and then asked his grandfather, "Which wolf will win?"

The old Cherokee simply replied, "The one you feed."`,
      te: `ఒక పాత చెరోకీ తన మనవడికి జీవితం గురించి బోధిస్తున్నాడు. "నాలో ఒక పోరాటం జరుగుతోంది," అతను అబ్బాయితో చెప్పాడు. "ఇది ఒక భయంకరమైన పోరాటం మరియు ఇది రెండు తోడేళ్ళ మధ్య జరుగుతోంది. ఒకటి చెడు - అది కోపం, అసూయ, దుఃఖం, విచారం, దురాశ, అహంకారం, ఆత్మదయ, అపరాధం, అసంతృప్తి, తక్కువతనం, అబద్ధాలు, తప్పుడు గర్వం, ఆధిపత్యం మరియు అహం.

అతను కొనసాగాడు, "మరొకటి మంచి - అది ఆనందం, శాంతి, ప్రేమ, ఆశ, నెమ్మది, వినయం, దయ, సద్భావన, సానుభూతి, ఔదార్యం, నిజం, కరుణ మరియు విశ్వాసం. అదే పోరాటం నీలో - మరియు ప్రతి వ్యక్తిలో కూడా జరుగుతోంది."

మనవడు దాని గురించి ఒక నిమిషం ఆలోచించి, తర్వాత తన తాతను అడిగాడు, "ఏ తోడేలు గెలుస్తుంది?"

పాత చెరోకీ సరళంగా జవాబిచ్చాడు, "నువ్వు తినిపించేది."`
    },
    moral: {
      en: "Your thoughts and actions determine which part of you grows stronger.",
      te: "మీ ఆలోచనలు మరియు చర్యలు మీలో ఏ భాగం బలంగా పెరుగుతుందో నిర్ణయిస్తాయి."
    }
  },
  {
    id: 3,
    title: {
      en: "The Obstacle in Our Path",
      te: "మన మార్గంలోని అడ్డంకి"
    },
    content: {
      en: `In ancient times, a king had a boulder placed on a roadway. Then he hid himself and watched to see if anyone would remove the huge rock. Some of the king's wealthiest merchants and courtiers came by and simply walked around it. Many loudly blamed the king for not keeping the roads clear, but none did anything about getting the stone out of the way.

Then a peasant came along carrying a load of vegetables. Upon approaching the boulder, the peasant laid down his burden and tried to move the stone to the side of the road. After much pushing and straining, he finally succeeded. After the peasant picked up his load of vegetables, he noticed a purse lying in the road where the boulder had been. The purse contained many gold coins and a note from the king indicating that the gold was for the person who removed the boulder from the roadway.

The peasant learned what many of us never understand: Every obstacle presents an opportunity to improve our condition.`,
      te: `ప్రాచీన కాలంలో, ఒక రాజు రహదారిపై ఒక పెద్ద రాతిని ఉంచాడు. తర్వాత అతను దాచి, ఎవరైనా ఆ పెద్ద రాతిని తొలగించేలా చూస్తున్నాడు. రాజు యొక్క ధనవంతులైన వర్తకులు మరియు సభాసదులు వచ్చి దాని చుట్టూ నడిచారు. చాలా మంది రాజు రహదారులు శుభ్రంగా ఉంచకపోవడాన్ని నిందించారు, కానీ ఎవరూ రాతిని తొలగించడానికి ఏమీ చేయలేదు.

తర్వాత ఒక రైతు కూరగాయల భారంతో వచ్చాడు. రాతి దగ్గరకు వచ్చినప్పుడు, రైతు తన భారాన్ని పెట్టి రాతిని రహదారి పక్కకు తరలించడానికి ప్రయత్నించాడు. చాలా నెట్టడం మరియు ఒత్తడం తర్వాత, అతను చివరకు విజయం సాధించాడు. రైతు తన కూరగాయల భారాన్ని తీసుకున్న తర్వాత, రాతి ఉన్న చోట ఒక సంచి పడి ఉన్నట్లు గమనించాడు. సంచిలో చాలా బంగారు నాణేలు మరియు రాజు నుండి ఒక నోట్ ఉంది, దానిలో రాతిని రహదారి నుండి తొలగించిన వ్యక్తికి బంగారం ఇవ్వబడుతుందని పేర్కొనబడింది.

రైతు చాలా మంది అర్థం చేసుకోని విషయాన్ని నేర్చుకున్నాడు: ప్రతి అడ్డంకి మన పరిస్థితిని మెరుగ్గా చేయడానికి ఒక అవకాశాన్ని అందిస్తుంది.`
    },
    moral: {
      en: "Every challenge in life is an opportunity to grow and improve.",
      te: "జీవితంలో ప్రతి సవాలు మనం పెరగడానికి మరియు మెరుగ్గా చేయడానికి ఒక అవకాశం."
    }
  },
  {
    id: 4,
    title: {
      en: "The Cracked Pot",
      te: "చీలిపోయిన కుండ"
    },
    content: {
      en: `A water bearer had two large pots, each hung on the ends of a pole which he carried across his neck. One of the pots had a crack in it, while the other pot was perfect and always delivered a full portion of water.

At the end of the long walk from the stream to the house, the cracked pot arrived only half full. For two years this went on daily, with the bearer delivering only one and a half pots full of water to his house.

Of course, the perfect pot was proud of its accomplishments. But the poor cracked pot was ashamed of its own imperfection, and miserable that it was able to accomplish only half of what it had been made to do.

After two years of what it perceived to be bitter failure, it spoke to the water bearer one day by the stream. "I am ashamed of myself, because this crack in my side causes water to leak out all the way back to your house."

The bearer said to the pot, "Did you notice that there were flowers only on your side of the path, but not on the other pot's side? That's because I have always known about your flaw, and I planted flower seeds on your side of the path. Every day, as we walked back, you watered them. For two years I have been able to pick these beautiful flowers to decorate the table. Without you being just the way you are, there would not be this beauty to grace the house."`,
      te: `ఒక నీటి మోసేవాడికి రెండు పెద్ద కుండలు ఉన్నాయి, ప్రతి ఒక్కటి ఒక కర్ర చివరలో వేలాడుతూ ఉండేవి. ఒక కుండలో పగుళ్ళు ఉన్నాయి, మరొక కుండ పరిపూర్ణంగా ఉండి ఎప్పుడూ పూర్తి నీటిని అందించేది.

సెలయేరు నుండి ఇంటి వరకు ఉన్న పొడవైన ప్రయాణం చివర, పగుళ్ళు ఉన్న కుండ సగం నిండి మాత్రమే వచ్చింది. రెండు సంవత్సరాలు ఇలా జరిగింది, మోసేవాడు తన ఇంటికి ఒకటిన్నర కుండల నీటిని మాత్రమే తీసుకువచ్చేవాడు.

వాస్తవానికి, పరిపూర్ణమైన కుండ తన విజయాలపై గర్వపడింది. కానీ పేద పగుళ్ళు ఉన్న కుండ తన అసంపూర్ణతపై సిగ్గుపడి, తనకు ఇవ్వబడిన పనిలో సగం మాత్రమే చేయగలిగినందుకు దుఃఖించింది.

రెండు సంవత్సరాల తీవ్రమైన వైఫల్యం తర్వాత, అది ఒక రోజు సెలయేరు దగ్గర మోసేవాడితో మాట్లాడింది. "నేను నా గురించి సిగ్గుపడుతున్నాను, ఎందుకంటే నా పక్కలో ఉన్న ఈ పగుళ్ళు మీ ఇంటికి తిరిగి వెళ్ళే మార్గమంతా నీరు చిందిస్తుంది."

మోసేవాడు కుండతో చెప్పాడు, "మీరు మీ వైపు మార్గంలో పువ్వులు ఉన్నాయని గమనించారా, కానీ మరొక కుండ వైపు లేవు? ఎందుకంటే నేను ఎప్పుడూ మీ లోపం గురించి తెలుసు, మరియు మీ మార్గంలో పువ్వుల విత్తనాలను నాటాను. ప్రతి రోజు మనం తిరిగి వెళ్ళేటప్పుడు, మీరు వాటిని నీరు పోశారు. రెండు సంవత్సరాలుగా నేను ఈ అందమైన పువ్వులను ఎంచుకుని టేబుల్ అలంకరించగలిగాను. మీరు ఉన్న విధంగా ఉండకపోతే, ఇంటిని అలంకరించే ఈ అందం ఉండేది కాదు."`
    },
    moral: {
      en: "Our perceived flaws can actually be our greatest strengths.",
      te: "మనం భావించే లోపాలు నిజానికి మన గొప్ప బలాలుగా మారవచ్చు."
    }
  },
  {
    id: 5,
    title: {
      en: "The Elephant Rope",
      te: "ఏనుగు తాడు"
    },
    content: {
      en: `A man was walking through an elephant camp, and he spotted that the elephants weren't being kept in cages or held by the use of chains. All that was holding them back from escaping the camp was a small piece of rope tied to one of their legs.

As the man gazed upon the elephants, he was completely confused as to why the elephants didn't just use their strength to break the rope and escape the camp. They could easily have done so, but instead, they didn't try to at all.

Curious and wanting to know the answer, he asked a trainer nearby why the elephants were just standing there and never tried to escape.

The trainer replied, "When they are very young and much smaller, we use the same size rope to tie them and, at that age, it's enough to hold them. As they grow up, they are conditioned to believe they cannot break away. They believe the rope can still hold them, so they never try to break free."`,
      te: `ఒక మనిషి ఏనుగుల శిబిరం గుండా నడుస్తున్నాడు, మరియు ఏనుగులు పంజాలో ఉంచబడలేదు లేదా గొలుసులతో బంధించబడలేదని గమనించాడు. వాటిని శిబిరం నుండి తప్పించుకోకుండా ఉంచేది ఒక చిన్న తాడు మాత్రమే, అది వాటి కాళ్ళలో ఒకదానికి కట్టబడి ఉండేది.

ఆ మనిషి ఏనుగులను చూస్తూ, వాటి బలాన్ని ఉపయోగించి తాడును తెంచి శిబిరం నుండి తప్పించుకోకపోవడానికి కారణం ఏమిటో పూర్తిగా అర్థం కాలేకపోయాడు. వాటికి అలా చేయడం సులభంగా ఉండేది, కానీ బదులుగా, వాటికి ప్రయత్నించలేదు.

ఆసక్తితో మరియు సమాధానం తెలుసుకోవాలనుకుంటూ, అతను సమీపంలో ఉన్న శిక్షకుడిని ఏనుగులు అక్కడే నిలబడి ఎందుకు తప్పించుకోవడానికి ప్రయత్నించలేదని అడిగాడు.

శిక్షకుడు జవాబిచ్చాడు, "వాటి చాలా చిన్నవి మరియు చాలా చిన్నవి ఉన్నప్పుడు, మనం అదే పరిమాణం తాడును ఉపయోగిస్తాము, మరియు ఆ వయస్సులో, అది వాటిని ఉంచడానికి సరిపోతుంది. వాటి పెరిగినప్పుడు, వాటి తప్పించుకోలేవని నమ్మేలా శిక్షణ ఇవ్వబడ్డాయి. వాటి తాడు ఇంకా వాటిని ఉంచగలదని నమ్మాయి, కనుక వాటి తప్పించుకోవడానికి ప్రయత్నించలేదు."`
    },
    moral: {
      en: "Don't let past limitations determine your future potential.",
      te: "గత పరిమితులు మీ భవిష్యత్ సామర్థ్యాన్ని నిర్ణయించనివ్వకండి."
    }
  },
  {
    id: 6,
    title: {
      en: "The Starfish Story",
      te: "చేప చుక్క కథ"
    },
    content: {
      en: `A young man was walking along the beach and saw thousands of starfish stranded on the shore. Further along, he noticed an old man, walking slowly and stooping often, picking up one starfish after another and throwing each one gently into the ocean.

"Why are you throwing starfish into the ocean?" he asked.

"Because the sun is up and the tide is going out and if I don't throw them in they'll die."

"But, old man, don't you realize there are miles and miles of beach and starfish all along it! You can't possibly make a difference!"

The old man listened calmly and then bent down to pick up another starfish and throw it into the sea. "It made a difference for that one."`,
      te: `ఒక యువకుడు సముద్రం వెంబడి నడుస్తున్నాడు మరియు వేలాది చేప చుక్కలు తీరంపై ఉన్నట్లు చూశాడు. మరింత ముందుకు, అతను ఒక పాత మనిషిని చూశాడు, నెమ్మదిగా నడుస్తూ మరియు తరచుగా వంగి, ఒక్కొక్క చేప చుక్కను తీసుకుని సముద్రంలోకి విసిరేవాడు.

"మీరు ఎందుకు చేప చుక్కలను సముద్రంలోకి విసుస్తున్నారు?" అతను అడిగాడు.

"ఎందుకంటే సూర్యుడు ఉదయించాడు మరియు ఓడ వెనక్కి వెళ్తోంది మరియు నేను వాటిని లోపలికి విసరకపోతే అవి చనిపోతాయి."

"కానీ, పాత మనిషి, మీరు గమనించలేదా - మైళ్ళ మైళ్ళ తీరం మరియు దాని వెంబడి చేప చుక్కలు ఉన్నాయి! మీరు వాటన్నింటినీ రక్షించలేరు, మీరు వాటిలో పదవ వంతు కూడా రక్షించలేరు. నిజానికి, మీరు రోజంతా పని చేసినా, మీ ప్రయత్నాలు ఎలాంటి తేడా చేయవు."

పాత మనిషి ప్రశాంతంగా విన్నాడు మరియు తర్వాత మరో చేప చుక్కను తీసుకుని సముద్రంలోకి విసిరాడు. "అది ఆ ఒక్కదానికి తేడా చేసింది."`
    },
    moral: {
      en: "Every small act of kindness makes a difference to someone.",
      te: "ప్రతి చిన్న దయ చర్య ఒకరికి తేడా చేస్తుంది."
    }
  }
];

const Moral = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'te' for Telugu
  const navigate = useNavigate();

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
        onClick={() => navigate('/user')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800"
          >
            {language === 'en' ? 'Motivational Stories' : 'ప్రేరణాత్మక కథలు'}
          </motion.h1>

          {/* Language Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border-2 border-indigo-100"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-blue-600 mb-4"
            >
              {stories[currentStory].title[language]}
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="prose prose-lg text-gray-600 mb-6"
            >
              {stories[currentStory].content[language].split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="mb-4"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-blue-500 shadow-md"
            >
              <p className="text-blue-700 font-semibold">
                {language === 'en' ? 'Moral: ' : 'నీతి: '}{stories[currentStory].moral[language]}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStory}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            {language === 'en' ? 'Previous Story' : 'మునుపటి కథ'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStory}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            {language === 'en' ? 'Next Story' : 'తర్వాతి కథ'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Moral;
