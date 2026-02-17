import React, { useState } from 'react';
import { Brain, Eye, Lightbulb, Users, BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const ConsciousnessExplorer = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [userChoices, setUserChoices] = useState({});
  const [expandedTheory, setExpandedTheory] = useState(null);

  const theories = [
    {
      id: 'physicalism',
      name: 'Physicalism',
      icon: Brain,
      color: 'bg-blue-500',
      tagline: 'Consciousness is purely physical',
      description: 'Everything about consciousness, including subjective experience, can be explained by physical processes in the brain. Mental states are identical to brain states.',
      strengths: ['Scientifically grounded', 'No mysterious non-physical entities', 'Consistent with neuroscience'],
      weaknesses: ['Struggles with the "hard problem"', 'Difficulty explaining qualia', 'The explanatory gap']
    },
    {
      id: 'dualism',
      name: 'Dualism',
      icon: Users,
      color: 'bg-purple-500',
      tagline: 'Mind and matter are separate',
      description: 'Consciousness is fundamentally non-physical. The mind is a distinct substance from the physical brain, though they interact.',
      strengths: ['Matches intuitive experience', 'Explains subjective "feel"', 'Takes qualia seriously'],
      weaknesses: ['Interaction problem', 'Conflicts with physics', 'Where does consciousness come from?']
    },
    {
      id: 'functionalism',
      name: 'Functionalism',
      icon: Lightbulb,
      color: 'bg-green-500',
      tagline: 'It\'s about what it does, not what it\'s made of',
      description: 'Mental states are defined by their functional role—what they do and how they relate to inputs, outputs, and other mental states. Consciousness could be implemented in silicon.',
      strengths: ['Multiple realizability', 'Compatible with AI consciousness', 'Focuses on organization'],
      weaknesses: ['Chinese Room objection', 'Inverted spectrum problem', 'Is function enough?']
    },
    {
      id: 'panpsychism',
      name: 'Panpsychism',
      icon: Eye,
      color: 'bg-orange-500',
      tagline: 'Consciousness is everywhere',
      description: 'Consciousness is a fundamental feature of the universe, present to some degree in all matter. Complex consciousness emerges from simpler conscious building blocks.',
      strengths: ['Avoids emergence problem', 'No sharp boundary', 'Philosophically elegant'],
      weaknesses: ['Combination problem', 'Seems counterintuitive', 'Hard to test']
    }
  ];

  const experiments = [
    {
      id: 'chinese-room',
      title: 'The Chinese Room',
      author: 'John Searle',
      category: 'AI & Understanding',
      description: 'Imagine you\'re locked in a room with a rulebook for manipulating Chinese symbols. People outside pass you Chinese questions, you follow the rules to form responses, and pass them back. To outsiders, it looks like you understand Chinese—but you\'re just following rules without comprehension.',
      question: 'Does the room (or you) understand Chinese?',
      implications: 'Challenges functionalism and strong AI. Suggests that syntax (rule-following) isn\'t enough for semantics (meaning and understanding).',
      perspectives: [
        {
          view: 'No understanding',
          reasoning: 'Just manipulating symbols without knowing what they mean. The system has no genuine comprehension—it\'s all mechanical.',
          alignment: ['dualism']
        },
        {
          view: 'The system understands',
          reasoning: 'While you alone don\'t understand, the entire system (you + rulebook + room) does. Understanding is a property of the whole system.',
          alignment: ['functionalism']
        },
        {
          view: 'Missing something crucial',
          reasoning: 'The room lacks intentionality and consciousness. Real understanding requires subjective experience, not just correct outputs.',
          alignment: ['dualism', 'physicalism']
        }
      ]
    },
    {
      id: 'marys-room',
      title: 'Mary\'s Room',
      author: 'Frank Jackson',
      category: 'Qualia & Knowledge',
      description: 'Mary is a brilliant scientist who knows everything physical about color—wavelengths, neural processes, everything—but she\'s lived her entire life in a black-and-white room. One day, she steps outside and sees red for the first time.',
      question: 'Does Mary learn something new?',
      implications: 'If she learns something new (what red looks like), this suggests that physical facts don\'t capture everything about consciousness. There\'s something about subjective experience that escapes physical description.',
      perspectives: [
        {
          view: 'Yes, she learns something',
          reasoning: 'She gains new knowledge about what red is like subjectively. This shows that qualia can\'t be reduced to physical facts—there\'s an explanatory gap.',
          alignment: ['dualism']
        },
        {
          view: 'No new facts, just new ability',
          reasoning: 'She doesn\'t learn new facts, but gains new abilities (to recognize, imagine, remember red). It\'s like learning to ride a bike—practical knowledge, not propositional.',
          alignment: ['physicalism', 'functionalism']
        },
        {
          view: 'She couldn\'t actually know everything physical',
          reasoning: 'If she truly knew every physical fact, she\'d know what red looks like. The thought experiment underestimates what complete physical knowledge would include.',
          alignment: ['physicalism']
        }
      ]
    },
    {
      id: 'philosophical-zombie',
      title: 'Philosophical Zombies',
      author: 'David Chalmers',
      category: 'Consciousness & Identity',
      description: 'Imagine someone physically identical to you—same brain, same behavior, same responses—but with no inner subjective experience. The lights are on but nobody\'s home. They act conscious but feel nothing.',
      question: 'Are philosophical zombies conceivable? Possible?',
      implications: 'If zombies are conceivable, this suggests consciousness is something "extra" beyond physical processes. If they\'re impossible, consciousness might be inseparable from physical structure.',
      perspectives: [
        {
          view: 'Zombies are conceivable',
          reasoning: 'We can coherently imagine them, which shows consciousness isn\'t logically entailed by physical facts. This supports dualism—consciousness is something extra.',
          alignment: ['dualism']
        },
        {
          view: 'Conceivable but not possible',
          reasoning: 'We can imagine them, but they\'re metaphysically impossible. Just like we can imagine water without H2O, but it\'s not actually possible. Consciousness necessarily arises from certain physical configurations.',
          alignment: ['physicalism']
        },
        {
          view: 'Not genuinely conceivable',
          reasoning: 'The zombie concept is incoherent. If something behaves exactly like a conscious being, it IS conscious. Behavior and consciousness are inseparable.',
          alignment: ['functionalism']
        }
      ]
    },
    {
      id: 'split-brain',
      title: 'Split-Brain Cases',
      author: 'Real neuroscience',
      category: 'Unity of Self',
      description: 'Some epilepsy patients have their corpus callosum severed, disconnecting the brain\'s hemispheres. Tests reveal each hemisphere can have different beliefs, preferences, and intentions. The left hand might button a shirt while the right unbuttons it.',
      question: 'Are there two consciousnesses in one skull?',
      implications: 'Challenges the unity of consciousness and the concept of a singular "self." Suggests consciousness might be more divisible and less unified than we intuitively think.',
      perspectives: [
        {
          view: 'Two separate consciousnesses',
          reasoning: 'Each hemisphere has its own experiences and intentions. There are literally two streams of consciousness sharing one body.',
          alignment: ['physicalism', 'functionalism']
        },
        {
          view: 'Still one consciousness',
          reasoning: 'Despite the disconnect, there\'s still a unified conscious experience, just with some coordination problems. The self remains singular.',
          alignment: ['dualism']
        },
        {
          view: 'No fact of the matter',
          reasoning: 'Our concept of "one consciousness" breaks down here. The question assumes consciousness has clearer boundaries than it actually does.',
          alignment: ['panpsychism']
        }
      ]
    }
  ];

  const handleChoice = (experimentId, perspective) => {
    setUserChoices({
      ...userChoices,
      [experimentId]: perspective
    });
  };

  const getTheoryScore = (theoryId) => {
    return Object.values(userChoices).filter(choice => 
      choice.alignment.includes(theoryId)
    ).length;
  };

  const renderIntro = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-full">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">The Mystery of Consciousness</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          What is it like to be you? How does subjective experience arise from matter? 
          These questions have puzzled philosophers and scientists for centuries.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">The Hard Problem</h3>
        <p className="text-gray-700 mb-3">
          We can explain how the brain processes information, controls behavior, and integrates data. 
          But why is there something it's like to be conscious? Why aren't we just zombies processing 
          information in the dark?
        </p>
        <p className="text-gray-700">
          This is called the <span className="font-semibold">hard problem of consciousness</span>, 
          and it's one of philosophy's deepest puzzles.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('theories')}
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-left"
        >
          <BookOpen className="w-8 h-8 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Explore Theories</h3>
          <p className="text-blue-100">Compare different philosophical approaches to consciousness</p>
        </button>
        
        <button
          onClick={() => setActiveTab('experiments')}
          className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 text-left"
        >
          <Lightbulb className="w-8 h-8 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Thought Experiments</h3>
          <p className="text-purple-100">Test your intuitions with classic philosophical puzzles</p>
        </button>
      </div>
    </div>
  );

  const renderTheories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Theories of Consciousness</h2>
        <button
          onClick={() => setActiveTab('intro')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back
        </button>
      </div>

      <p className="text-gray-600">
        Different philosophical traditions offer competing explanations for consciousness. 
        Each has strengths and weaknesses. Which resonates with you?
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {theories.map((theory) => {
          const Icon = theory.icon;
          const isExpanded = expandedTheory === theory.id;
          const score = getTheoryScore(theory.id);
          
          return (
            <div
              key={theory.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`${theory.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{theory.name}</h3>
                    <p className="text-sm text-gray-500">{theory.tagline}</p>
                  </div>
                </div>
                {score > 0 && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {score} match{score > 1 ? 'es' : ''}
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-4">{theory.description}</p>

              <button
                onClick={() => setExpandedTheory(isExpanded ? null : theory.id)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show strengths & weaknesses
                  </>
                )}
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Strengths:</h4>
                    <ul className="space-y-1">
                      {theory.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Weaknesses:</h4>
                    <ul className="space-y-1">
                      {theory.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Try the thought experiments</h3>
        <p className="text-gray-700 mb-3">
          Want to see which theory aligns with your intuitions? Work through the thought 
          experiments and we'll track which philosophical perspective matches your responses.
        </p>
        <button
          onClick={() => setActiveTab('experiments')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Start Experiments →
        </button>
      </div>
    </div>
  );

  const renderExperiments = () => {
    if (!selectedExperiment) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Thought Experiments</h2>
            <button
              onClick={() => setActiveTab('intro')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back
            </button>
          </div>

          <p className="text-gray-600">
            These classic thought experiments probe the nature of consciousness, understanding, 
            and subjective experience. Click one to explore it in depth.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {experiments.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExperiment(exp.id)}
                className="bg-white border-2 border-gray-200 hover:border-purple-500 rounded-lg p-6 text-left transition-all hover:shadow-lg group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-500">{exp.author}</p>
                  </div>
                  {userChoices[exp.id] && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      Completed
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{exp.category}</p>
                <p className="text-gray-700 line-clamp-3">{exp.description}</p>
                <div className="mt-4 flex items-center gap-2 text-purple-600 font-medium">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const exp = experiments.find(e => e.id === selectedExperiment);
    const userChoice = userChoices[exp.id];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedExperiment(null)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to experiments
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="w-8 h-8" />
            <div>
              <h2 className="text-3xl font-bold">{exp.title}</h2>
              <p className="text-purple-100">{exp.author}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
            <p className="text-lg">{exp.description}</p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-2">The Central Question</h3>
          <p className="text-gray-800 text-lg">{exp.question}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">What do you think?</h3>
          <div className="space-y-4">
            {exp.perspectives.map((perspective, idx) => {
              const isSelected = userChoice === perspective;
              
              return (
                <div
                  key={idx}
                  className={`border-2 rounded-lg p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
                  }`}
                  onClick={() => handleChoice(exp.id, perspective)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{perspective.view}</h4>
                      <p className="text-gray-700">{perspective.reasoning}</p>
                      {isSelected && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {perspective.alignment.map(theoryId => {
                            const theory = theories.find(t => t.id === theoryId);
                            return (
                              <span
                                key={theoryId}
                                className={`${theory.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                              >
                                ← {theory.name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {userChoice && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Implications</h3>
            <p className="text-gray-700">{exp.implications}</p>
            <button
              onClick={() => setSelectedExperiment(null)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Try another experiment →
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    const totalChoices = Object.keys(userChoices).length;
    if (totalChoices === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Complete some thought experiments first!</p>
          <button
            onClick={() => setActiveTab('experiments')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Start Experiments
          </button>
        </div>
      );
    }

    const theoryScores = theories.map(theory => ({
      ...theory,
      score: getTheoryScore(theory.id)
    })).sort((a, b) => b.score - a.score);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Your Philosophical Profile</h2>
          <button
            onClick={() => setActiveTab('intro')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back
          </button>
        </div>

        <p className="text-gray-600">
          Based on your responses to {totalChoices} thought experiment{totalChoices > 1 ? 's' : ''}, 
          here's how your intuitions align with different theories:
        </p>

        <div className="space-y-4">
          {theoryScores.map((theory, idx) => {
            const Icon = theory.icon;
            const percentage = totalChoices > 0 ? (theory.score / totalChoices) * 100 : 0;
            
            return (
              <div key={theory.id} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-gray-400">#{idx + 1}</div>
                    <div className={`${theory.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{theory.name}</h3>
                      <p className="text-sm text-gray-500">{theory.tagline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{theory.score}</div>
                    <div className="text-sm text-gray-500">
                      {percentage.toFixed(0)}% match
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${theory.color} h-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">What does this mean?</h3>
          <p className="text-gray-700 mb-3">
            Your responses suggest you lean toward <span className="font-bold">{theoryScores[0].name}</span>. 
            But remember: these are just intuitions! Many philosophers change their views as they learn more.
          </p>
          <p className="text-gray-700">
            The mystery of consciousness remains unsolved. Each theory has devoted defenders and serious 
            objections. The question isn't just academic—it shapes how we think about AI, animal welfare, 
            personal identity, and what makes life meaningful.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('experiments')}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Explore More Experiments
          </button>
          <button
            onClick={() => setActiveTab('theories')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Study the Theories
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-center gap-2">
          {[
            { id: 'intro', label: 'Introduction' },
            { id: 'theories', label: 'Theories' },
            { id: 'experiments', label: 'Experiments' },
            { id: 'results', label: 'Your Profile' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedExperiment(null);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === 'intro' && renderIntro()}
          {activeTab === 'theories' && renderTheories()}
          {activeTab === 'experiments' && renderExperiments()}
          {activeTab === 'results' && renderResults()}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            This exploration covers just a fraction of the philosophical debate. 
            For deeper reading, explore: David Chalmers, Daniel Dennett, Thomas Nagel, 
            and contemporary consciousness studies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessExplorer;