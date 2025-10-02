import { Component } from 'react';

interface Person {
  fullName: string;
  bio: string;
  imgSrc: string;
  profession: string;
}

interface AppState {
  person: Person;
  shows: boolean;
  timeElapsed: number;
}

class App extends Component<{}, AppState> {
  private intervalId: number | null = null;

  constructor(props: {}) {
    super(props);
    
    this.state = {
      person: {
        fullName: "Sarah Chen",
        bio: "Passionate software engineer with 5 years of experience in full-stack development. Loves creating intuitive user experiences and solving complex problems with elegant code solutions.",
        imgSrc: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
        profession: "Senior Software Engineer"
      },
      shows: false,
      timeElapsed: 0
    };
  }

  componentDidMount() {
    // Start the interval to track time elapsed since component mounted
    this.intervalId = window.setInterval(() => {
      this.setState(prevState => ({
        timeElapsed: prevState.timeElapsed + 1
      }));
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up the interval when component unmounts
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleShow = () => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  }

  formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  }

  render() {
    const { person, shows, timeElapsed } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto p-6">
          {/* Header with timer */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Person Profile App</h1>
            <div className="bg-white rounded-lg shadow-md p-4 inline-block">
              <p className="text-sm text-gray-600">Component mounted for:</p>
              <p className="text-xl font-mono font-bold text-indigo-600">
                {this.formatTime(timeElapsed)}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="text-center mb-8">
            <button
              onClick={this.toggleShow}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                shows 
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200' 
                  : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200'
              }`}
            >
              {shows ? 'Hide Profile' : 'Show Profile'}
            </button>
          </div>

          {/* Person Profile */}
          <div className={`transition-all duration-500 transform ${
            shows 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}>
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    src={person.imgSrc}
                    alt={person.fullName}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {person.fullName}
                  </h2>
                  <p className="text-lg text-indigo-600 font-semibold mb-4">
                    {person.profession}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Currently available
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Profile views: {Math.floor(Math.random() * 1000) + 100}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Click the button above to toggle the profile visibility</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;