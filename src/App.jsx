import { useState } from 'react'
import {
  LayoutDashboard, BookOpen, UserRound, Users, FolderKanban,
  BriefcaseBusiness, GraduationCap, Settings, Bell, Search,
  ArrowRight, CheckCircle2, Clock, Target, TrendingUp, Sparkles,
  Menu, X
} from 'lucide-react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Learn Python fundamentals', category: 'Programming', duration: '2 hours', done: true },
  { id: 2, title: 'Practice data structures', category: 'Problem solving', duration: '3 hours', done: false },
  { id: 3, title: 'Complete SQL essentials', category: 'Databases', duration: '2 hours', done: false },
  { id: 4, title: 'Build your first mini project', category: 'Project', duration: '4 hours', done: false },
]

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Learning Pathway', icon: BookOpen },
  { name: 'Skill Passport', icon: UserRound },
  { name: 'Mentorship', icon: Users },
  { name: 'Project Matcher', icon: FolderKanban },
  { name: 'Internship Readiness', icon: BriefcaseBusiness },
  { name: 'Resources', icon: GraduationCap },
  { name: 'Settings', icon: Settings },
]

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [name, setName] = useState(() => localStorage.getItem('alpg-name') || 'Student')
  const [career, setCareer] = useState(() => localStorage.getItem('alpg-career') || 'Data Analyst')
  const [skills, setSkills] = useState(() => localStorage.getItem('alpg-skills') || 'Python, SQL, Communication')
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('alpg-tasks')
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })
  const [notice, setNotice] = useState('')
  const [resourceSearch, setResourceSearch] = useState('')
  const [goalSaved, setGoalSaved] = useState(false)
  
const [requestedMentors, setRequestedMentors] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem('alpg-mentor-requests') || '[]'
    )
  } catch {
    return []
  }
})

  const [interestedProjects, setInterestedProjects] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem('alpg-interested-projects') || '[]'
    )
  } catch {
    return []
  }
})

  const completed = tasks.filter(task => task.done).length
  const progress = Math.round((completed / tasks.length) * 100)
  const skillList = skills.split(',').map(skill => skill.trim()).filter(Boolean)

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  function toggleTask(id) {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    )
    setTasks(updated)
    localStorage.setItem('alpg-tasks', JSON.stringify(updated))
  }

  function saveProfile(event) {
    event.preventDefault()
    localStorage.setItem('alpg-name', name)
    localStorage.setItem('alpg-career', career)
    localStorage.setItem('alpg-skills', skills)
    setGoalSaved(true)
    showNotice('Your profile and career goal have been saved.')
  }

  function resetProgress() {
    setTasks(initialTasks)
    localStorage.setItem('alpg-tasks', JSON.stringify(initialTasks))
    showNotice('Learning progress has been reset.')
  }

  
function toggleMentorRequest(mentorName) {
  const alreadyRequested = requestedMentors.includes(mentorName)

  const updated = alreadyRequested
    ? requestedMentors.filter(name => name !== mentorName)
    : [...requestedMentors, mentorName]

  setRequestedMentors(updated)
  localStorage.setItem(
    'alpg-mentor-requests',
    JSON.stringify(updated)
  )

  showNotice(
    alreadyRequested
      ? `Request removed for ${mentorName}.`
      : `Mentorship request saved for ${mentorName}.`
  )
}


  function toggleProjectInterest(projectTitle) {
  const updated = interestedProjects.includes(projectTitle)
    ? interestedProjects.filter(title => title !== projectTitle)
    : [...interestedProjects, projectTitle]

  setInterestedProjects(updated)
  localStorage.setItem(
    'alpg-interested-projects',
    JSON.stringify(updated)
  )
}

  const resources = [
    { title: 'Python for Beginners', type: 'Course', level: 'Beginner', skill: 'Python', duration: '4 hours' },
    { title: 'SQL Practice Lab', type: 'Interactive lab', level: 'Beginner', skill: 'SQL', duration: '2 hours' },
    { title: 'Data Analysis with Pandas', type: 'Tutorial', level: 'Intermediate', skill: 'Python', duration: '3 hours' },
    { title: 'Communication Skills', type: 'Learning module', level: 'All levels', skill: 'Communication', duration: '1 hour' },
    { title: 'Build a Portfolio Project', type: 'Project guide', level: 'Intermediate', skill: 'Projects', duration: '5 hours' },
  ]

  const filteredResources = resources.filter(resource =>
    `${resource.title} ${resource.skill} ${resource.type}`.toLowerCase().includes(resourceSearch.toLowerCase())
  )

  function renderContent() {
    switch (activePage) {
      
case 'Learning Pathway': {
  const roadmaps = {
    'Data Analyst': [
      { title: 'Python Fundamentals', skill: 'Python', level: 'Beginner' },
      { title: 'SQL and Databases', skill: 'SQL', level: 'Beginner' },
      { title: 'Excel for Analysis', skill: 'Excel', level: 'Beginner' },
      { title: 'Statistics Basics', skill: 'Statistics', level: 'Intermediate' },
      { title: 'Data Visualization', skill: 'Data Visualization', level: 'Intermediate' },
      { title: 'Build an Analytics Project', skill: 'Project', level: 'Advanced' },
    ],
    'Web Developer': [
      { title: 'HTML Foundations', skill: 'HTML', level: 'Beginner' },
      { title: 'CSS and Responsive Design', skill: 'CSS', level: 'Beginner' },
      { title: 'JavaScript Fundamentals', skill: 'JavaScript', level: 'Beginner' },
      { title: 'React Components and State', skill: 'React', level: 'Intermediate' },
      { title: 'Git and Version Control', skill: 'Git', level: 'Intermediate' },
      { title: 'Build a Web Application', skill: 'Project', level: 'Advanced' },
    ],
    'AI Engineer': [
      { title: 'Python Fundamentals', skill: 'Python', level: 'Beginner' },
      { title: 'Statistics and Probability', skill: 'Statistics', level: 'Beginner' },
      { title: 'Data Preparation', skill: 'Data', level: 'Intermediate' },
      { title: 'Machine Learning Basics', skill: 'Machine Learning', level: 'Intermediate' },
      { title: 'Model Evaluation', skill: 'Model Evaluation', level: 'Advanced' },
      { title: 'Build an AI Project', skill: 'Project', level: 'Advanced' },
    ],
    'Cybersecurity Analyst': [
      { title: 'Networking Fundamentals', skill: 'Networking', level: 'Beginner' },
      { title: 'Linux Essentials', skill: 'Linux', level: 'Beginner' },
      { title: 'Python for Security', skill: 'Python', level: 'Intermediate' },
      { title: 'Security Fundamentals', skill: 'Security', level: 'Intermediate' },
      { title: 'Risk Analysis', skill: 'Risk Analysis', level: 'Advanced' },
      { title: 'Build a Security Lab Project', skill: 'Project', level: 'Advanced' },
    ],
  }

  const roadmap = roadmaps[career] || roadmaps['Data Analyst']

  const studentSkills = skills
    .split(',')
    .map(skill => skill.trim().toLowerCase())
    .filter(Boolean)

  const skillTasks = roadmap.filter(task => task.skill !== 'Project')

  const recommendedTasks = roadmap.filter(task => {
    if (task.skill === 'Project') return false

    return !studentSkills.some(skill =>
      skill.includes(task.skill.toLowerCase()) ||
      task.skill.toLowerCase().includes(skill)
    )
  })

  const completedCount = tasks.filter(task => task.completed).length
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0

  return (
    <>
      <PageHeading
        eyebrow="YOUR PERSONAL LEARNING JOURNEY"
        title="Adaptive learning pathway"
        subtitle={`A suggested learning roadmap for your ${career} goal.`}
      />

      <div className="stats-grid">
        <div className="panel stat-card">
          <p className="stat-label">Overall progress</p>
          <h2>{progress}%</h2>
          <p className="stat-change">Based on your learning tasks</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Roadmap skills</p>
          <h2>{skillTasks.length}</h2>
          <p className="stat-change">Core skills in this roadmap</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Suggested priorities</p>
          <h2>{recommendedTasks.length}</h2>
          <p className="stat-change">Skills not found in your profile</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h3>Your learning progress</h3>

        <div
          style={{
            height: 12,
            background: '#e9e7f3',
            borderRadius: 20,
            overflow: 'hidden',
            margin: '16px 0',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#7357d9',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <p>{completedCount} of {tasks.length} learning tasks completed.</p>

        <button
          className="secondary-button"
          onClick={() => {
            setActivePage('Settings')
            showNotice('Update your career goal and skills in Settings.')
          }}
        >
          Update my profile
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h3>Recommended next skills</h3>
        <p className="feature-description">
          These roadmap skills were not found in your saved skills list.
        </p>

        {recommendedTasks.length > 0 ? (
          <div className="feature-tags">
            {recommendedTasks.map(task => (
              <span key={task.skill}>{task.skill}</span>
            ))}
          </div>
        ) : (
          <p>Your profile matches all the core skills in this sample roadmap.</p>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <PageHeading
          eyebrow="FOLLOW YOUR ROADMAP"
          title="Learning stages"
          subtitle="Work through the recommended stages and practise with a project."
        />

        <div className="feature-grid">
          {roadmap.map((task, index) => {
            const isKnown = studentSkills.some(skill =>
              skill.includes(task.skill.toLowerCase()) ||
              task.skill.toLowerCase().includes(skill)
            )

            return (
              <div className="panel feature-card" key={task.title}>
                <div className="feature-card-top">
                  <div className="feature-avatar">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <span className="tag">{task.level}</span>
                </div>

                <h3>{task.title}</h3>

                <p className="feature-role">
                  {task.skill === 'Project'
                    ? 'Apply what you have learned'
                    : isKnown
                      ? 'Skill listed in your profile'
                      : 'Recommended for development'}
                </p>

                <p className="feature-description">
                  {task.skill === 'Project'
                    ? 'Create a small project to practise your skills and demonstrate your learning.'
                    : `Study ${task.skill}, practise with exercises, and apply it to a real problem.`}
                </p>

                <div className="feature-tags">
                  <span>{task.skill}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="demo-note">
        Demo mode: this roadmap uses predefined career paths and matches their
        skill names against your profile. Adaptive recommendations based on quiz
        scores and prerequisites would require additional assessment logic.
      </p>
    </>
  )
}


      case 'Skill Passport':
        return (
          <>
            <PageHeading eyebrow="YOUR GROWTH, VISUALISED" title="Skill passport" subtitle="Manage your skills and keep your career profile up to date." />
            <div className="panel">
              <h3>Your current skills</h3><p className="muted">These skills are taken from your profile.</p>
              <div className="skill-cloud">{skillList.map((skill, i) => <span className="skill-chip" key={`${skill}-${i}`}>{skill}</span>)}</div>
              <button className="primary-button" onClick={() => setActivePage('Settings')}>Edit my skills <ArrowRight size={16} /></button>
            </div>
            <div className="stat-grid">
              <StatCard icon={<CheckCircle2 />} label="Activities completed" value={`${completed}/${tasks.length}`} />
              <StatCard icon={<TrendingUp />} label="Learning progress" value={`${progress}%`} />
              <StatCard icon={<Target />} label="Career target" value={career} />
            </div>
          </>
        )

        
case 'Mentorship': {
  const mentors = [
    {
      name: 'Aarav Sharma',
      role: 'Data Analyst',
      skills: ['Python', 'SQL', 'Power BI'],
      availability: 'Weekends',
      initials: 'AS',
    },
    {
      name: 'Priya Mehta',
      role: 'Frontend Developer',
      skills: ['React', 'JavaScript', 'UI/UX'],
      availability: 'Evenings',
      initials: 'PM',
    },
    {
      name: 'Rohan Kapoor',
      role: 'AI Engineer',
      skills: ['Python', 'Machine Learning', 'AI'],
      availability: 'Flexible',
      initials: 'RK',
    },
  ]

  return (
    <>
      <PageHeading
        eyebrow="LEARN FROM PEERS"
        title="Senior–junior mentorship"
        subtitle="Discover experienced peers and keep track of your mentorship requests."
      />

      <div className="panel project-interest-summary">
        <div>
          <h3>Your mentorship requests</h3>
          <p>
            You have requested {requestedMentors.length} of {mentors.length} sample mentors.
          </p>
        </div>
        <span className="tag">
          {requestedMentors.length} requested
        </span>
      </div>

      <div className="feature-grid">
        {mentors.map(mentor => {
          const requested = requestedMentors.includes(mentor.name)

          return (
            <div className="panel feature-card" key={mentor.name}>
              <div className="feature-card-top">
                <div className="feature-avatar">
                  {mentor.initials}
                </div>
                <span className="tag">
                  {requested ? 'Requested' : mentor.availability}
                </span>
              </div>

              <h3>{mentor.name}</h3>
              <p className="feature-role">{mentor.role}</p>

              <p className="feature-description">
                Get guidance, discuss learning goals, and explore career advice.
              </p>

              <div className="feature-tags">
                {mentor.skills.map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <button
                className={requested ? 'secondary-button' : 'primary-button'}
                onClick={() => toggleMentorRequest(mentor.name)}
              >
                {requested ? 'Cancel request' : 'Request mentorship'}
                <ArrowRight size={15} />
              </button>
            </div>
          )
        })}
      </div>

      <p className="demo-note">
        Demo mode: mentor requests are saved in this browser.
        Real mentor communication and session booking require a backend.
      </p>
    </>
  )
}


        case 'Project Matcher':
  const projects = [
    {
      title: 'Student Performance Dashboard',
      role: 'Data analytics · Team of 3',
      tags: ['Python', 'SQL', 'Visualisation'],
      description: 'Analyse student performance and build an interactive dashboard.',
    },
    {
      title: 'Smart Study Planner',
      role: 'Web application · Team of 4',
      tags: ['React', 'JavaScript', 'UI/UX'],
      description: 'Create a planner that organises study goals and tracks completion.',
    },
    {
      title: 'Career Recommendation Tool',
      role: 'AI application · Team of 3',
      tags: ['Python', 'Machine Learning', 'Data'],
      description: 'Explore how skills can be mapped to potential career paths.',
    },
  ]

  return (
    <>
      <PageHeading
        eyebrow="BUILD SOMETHING REAL"
        title="Project matcher"
        subtitle="Discover projects and track the opportunities you are interested in."
      />

      <div className="panel project-interest-summary">
        <div>
          <h3>Your project interests</h3>
          <p>
            You have selected {interestedProjects.length} of {projects.length} sample projects.
          </p>
        </div>
        <span className="tag">{interestedProjects.length} selected</span>
      </div>

      <div className="feature-grid">
        {projects.map(project => {
          const selected = interestedProjects.includes(project.title)

          return (
            <div className="panel feature-card" key={project.title}>
              <div className="feature-card-top">
                <div className="feature-avatar">
                  <FolderKanban size={22} />
                </div>
                <span className="tag">
                  {selected ? 'Interested' : 'Open'}
                </span>
              </div>

              <h3>{project.title}</h3>
              <p className="feature-role">{project.role}</p>
              <p className="feature-description">{project.description}</p>

              <div className="feature-tags">
                {project.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button
                className={selected ? 'secondary-button' : 'primary-button'}
                onClick={() => toggleProjectInterest(project.title)}
              >
                {selected ? 'Remove interest' : "I'm interested"}
                <ArrowRight size={15} />
              </button>
            </div>
          )
        })}
      </div>

      <p className="demo-note">
        Demo mode: project interests are saved in this browser.
        Team formation and live project listings require a backend.
      </p>
    </>
  )

  
case 'Internship Readiness': {
  const roleRequirements = {
    'Data Analyst': [
      'Python',
      'SQL',
      'Excel',
      'Data Visualization',
      'Statistics',
    ],
    'Web Developer': [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Git',
    ],
    'AI Engineer': [
      'Python',
      'Machine Learning',
      'Statistics',
      'Data',
      'SQL',
    ],
    'Cybersecurity Analyst': [
      'Networking',
      'Linux',
      'Python',
      'Security',
      'Risk Analysis',
    ],
  }

  const availableSkills = skills
    .split(',')
    .map(skill => skill.trim().toLowerCase())
    .filter(Boolean)

  const requirements = roleRequirements[career] || roleRequirements['Data Analyst']

  const matchedSkills = requirements.filter(required =>
    availableSkills.some(skill =>
      skill.includes(required.toLowerCase()) ||
      required.toLowerCase().includes(skill)
    )
  )

  const missingSkills = requirements.filter(
    required => !matchedSkills.includes(required)
  )

  const readiness = Math.round(
    (matchedSkills.length / requirements.length) * 100
  )

  return (
    <>
      <PageHeading
        eyebrow="YOUR NEXT OPPORTUNITY"
        title="Internship readiness"
        subtitle="Compare your current skills with the skills expected for your target career."
      />

      <div className="panel" style={{ marginBottom: 20 }}>
        <label
          htmlFor="readiness-career"
          style={{
            display: 'block',
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          Target internship role
        </label>

        <select
          id="readiness-career"
          value={career}
          onChange={event => {
            setCareer(event.target.value)
            localStorage.setItem('alpg-career', event.target.value)
          }}
          style={{
            width: '100%',
            maxWidth: 420,
            padding: 12,
            borderRadius: 10,
            border: '1px solid #ddd',
            background: 'var(--card, white)',
            color: 'inherit',
          }}
        >
          {Object.keys(roleRequirements).map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <p className="demo-note" style={{ marginTop: 12 }}>
          Your skills are taken from your saved profile. Edit them in Settings
          to update this analysis.
        </p>
      </div>

      <div className="stats-grid">
        <div className="panel stat-card">
          <p className="stat-label">Readiness score</p>
          <h2>{readiness}%</h2>
          <p className="stat-change">Based on sample role requirements</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Skills matched</p>
          <h2>{matchedSkills.length}/{requirements.length}</h2>
          <p className="stat-change">Required skills identified</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Skills to develop</p>
          <h2>{missingSkills.length}</h2>
          <p className="stat-change">Potential learning priorities</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h3>Readiness progress</h3>

        <div
          style={{
            height: 12,
            background: '#e9e7f3',
            borderRadius: 20,
            overflow: 'hidden',
            margin: '16px 0',
          }}
        >
          <div
            style={{
              width: `${readiness}%`,
              height: '100%',
              background: '#7357d9',
              borderRadius: 20,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <p>
          {readiness === 100
            ? 'All sample requirements matched! Keep practising and building project evidence.'
            : readiness >= 60
              ? 'Good progress! Focus on the remaining skills to strengthen your profile.'
              : 'Start with the missing foundational skills and build small projects to practise them.'}
        </p>
      </div>

      <div className="feature-grid" style={{ marginTop: 20 }}>
        <div className="panel feature-card">
          <h3>Matched skills</h3>
          <p className="feature-description">
            Skills from your profile that match this role.
          </p>

          {matchedSkills.length > 0 ? (
            <div className="feature-tags">
              {matchedSkills.map(skill => (
                <span key={skill}>✓ {skill}</span>
              ))}
            </div>
          ) : (
            <p>No matching skills found yet. Add your skills in Settings.</p>
          )}
        </div>

        <div className="panel feature-card">
          <h3>Recommended learning priorities</h3>
          <p className="feature-description">
            Focus on these requirements next.
          </p>

          {missingSkills.length > 0 ? (
            <div className="feature-tags">
              {missingSkills.map(skill => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          ) : (
            <p>No missing skills in this sample checklist.</p>
          )}

          {missingSkills.length > 0 && (
            <button
              className="primary-button"
              onClick={() => {
                setActivePage('Learning Pathway')
                showNotice('Open your learning pathway to plan your next steps.')
              }}
            >
              Open learning pathway
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      <p className="demo-note">
        Demo mode: readiness uses simple text matching against sample skill
        requirements. It is not a prediction of actual internship selection.
      </p>
    </>
  )
}

      
case 'Resources': {
  const resources = [
    {
      id: 'python-basics',
      title: 'Python Programming Fundamentals',
      category: 'Programming',
      description: 'Build a foundation in Python variables, loops, functions, and data structures.',
      type: 'Beginner course',
    },
    {
      id: 'sql-practice',
      title: 'SQL for Data Analysis',
      category: 'Data Analytics',
      description: 'Practise filtering, joins, grouping, and querying relational databases.',
      type: 'Practice tutorial',
    },
    {
      id: 'react-guide',
      title: 'React Development Guide',
      category: 'Web Development',
      description: 'Learn components, props, state, and interactive user interfaces.',
      type: 'Developer guide',
    },
    {
      id: 'ml-intro',
      title: 'Introduction to Machine Learning',
      category: 'Artificial Intelligence',
      description: 'Understand model training, features, predictions, and evaluation.',
      type: 'Beginner course',
    },
    {
      id: 'cyber-basics',
      title: 'Cybersecurity Fundamentals',
      category: 'Cybersecurity',
      description: 'Explore network security, common threats, and safe computing practices.',
      type: 'Learning guide',
    },
  ]

  const completedResources = JSON.parse(
    localStorage.getItem('alpg-completed-resources') || '[]'
  )

  const resourceRatings = JSON.parse(
    localStorage.getItem('alpg-resource-ratings') || '{}'
  )

  const filteredResources = resources.filter(resource => {
    const query = resourceSearch.toLowerCase().trim()

    return (
      resource.title.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query)
    )
  })

  function toggleResource(resourceId) {
    const saved = JSON.parse(
      localStorage.getItem('alpg-completed-resources') || '[]'
    )

    const updated = saved.includes(resourceId)
      ? saved.filter(id => id !== resourceId)
      : [...saved, resourceId]

    localStorage.setItem(
      'alpg-completed-resources',
      JSON.stringify(updated)
    )

    showNotice(
      updated.includes(resourceId)
        ? 'Resource marked as completed!'
        : 'Resource marked as incomplete.'
    )

    setResourceSearch(current => current)
    setActivePage('Resources')
  }

  function rateResource(resourceId, rating) {
    const saved = JSON.parse(
      localStorage.getItem('alpg-resource-ratings') || '{}'
    )

    saved[resourceId] = rating

    localStorage.setItem(
      'alpg-resource-ratings',
      JSON.stringify(saved)
    )

    showNotice('Your resource rating has been saved.')
    setActivePage('Resources')
  }

  return (
    <>
      <PageHeading
        eyebrow="LEARN AND GROW"
        title="Learning resources"
        subtitle="Explore learning materials, track completion, and rate how helpful each resource was."
      />

      <div className="stats-grid">
        <div className="panel stat-card">
          <p className="stat-label">Available resources</p>
          <h2>{resources.length}</h2>
          <p className="stat-change">Across multiple learning topics</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Completed</p>
          <h2>{completedResources.filter(id =>
            resources.some(resource => resource.id === id)
          ).length}</h2>
          <p className="stat-change">Resources you've finished</p>
        </div>

        <div className="panel stat-card">
          <p className="stat-label">Your ratings</p>
          <h2>{Object.keys(resourceRatings).filter(id =>
            resources.some(resource => resource.id === id)
          ).length}</h2>
          <p className="stat-change">Resources you've rated</p>
        </div>
      </div>

      <div className="resource-search" style={{ marginTop: 22 }}>
        <input
          type="text"
          placeholder="Search by resource, topic, or skill..."
          value={resourceSearch}
          onChange={event => setResourceSearch(event.target.value)}
          aria-label="Search learning resources"
        />
      </div>

      <div className="feature-grid" style={{ marginTop: 20 }}>
        {filteredResources.map(resource => {
          const isCompleted = completedResources.includes(resource.id)
          const rating = resourceRatings[resource.id] || 0

          return (
            <div className="panel feature-card" key={resource.id}>
              <div className="feature-card-top">
                <div className="feature-avatar">
                  <BookOpen size={22} />
                </div>

                <span className="tag">
                  {isCompleted ? 'Completed' : resource.type}
                </span>
              </div>

              <h3>{resource.title}</h3>
              <p className="feature-role">{resource.category}</p>
              <p className="feature-description">
                {resource.description}
              </p>

              <button
                className={isCompleted ? 'secondary-button' : 'primary-button'}
                onClick={() => toggleResource(resource.id)}
              >
                {isCompleted ? 'Mark incomplete' : 'Mark as completed'}
                <ArrowRight size={15} />
              </button>

              <div style={{ marginTop: 18 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>
                  How helpful was this resource?
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => rateResource(resource.id, star)}
                      aria-label={`Rate ${resource.title} ${star} out of 5`}
                      title={`${star} out of 5`}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: 2,
                        color: star <= rating ? '#e6a817' : '#a8a8b3',
                        fontSize: 24,
                      }}
                    >
                      ★
                    </button>
                  ))}

                  <span className="feature-role">
                    {rating ? `${rating}/5` : 'Not rated'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="panel" style={{ marginTop: 20 }}>
          No resources match your search. Try another keyword.
        </div>
      )}

      <p className="demo-note">
        Demo mode: completion and ratings are saved in this browser.
        These are sample resources; aggregate learning effectiveness requires
        collected student assessment data.
      </p>
    </>
  )
}

      case 'Settings':
        return (
          <>
            <PageHeading eyebrow="MAKE IT YOURS" title="Profile & settings" subtitle="Update your details and career target. Changes are saved in this browser." />
            <form className="panel settings-form" onSubmit={saveProfile}>
              <label>Display name<input value={name} onChange={e => { setName(e.target.value); setGoalSaved(false) }} placeholder="Enter your name" required /></label>
              <label>Target career<select value={career} onChange={e => { setCareer(e.target.value); setGoalSaved(false) }}><option>Data Analyst</option><option>Web Developer</option><option>AI Engineer</option><option>Cybersecurity Analyst</option><option>UI/UX Designer</option><option>Cloud Engineer</option></select></label>
              <label>Skills (separate with commas)<textarea rows="4" value={skills} onChange={e => { setSkills(e.target.value); setGoalSaved(false) }} placeholder="Python, SQL, Communication" /></label>
              <button className="primary-button" type="submit">Save profile <CheckCircle2 size={17} /></button>
              {goalSaved && <span className="saved-message">Profile saved successfully.</span>}
            </form>
            <div className="panel reset-panel"><div><h3>Reset learning progress</h3><p>Restore the sample activities to their initial state.</p></div><button className="secondary-button" onClick={resetProgress}>Reset</button></div>
          </>
        )
      default:
        return (
          <>
            <PageHeading eyebrow="YOUR LEARNING, IN ONE PLACE" title={`Welcome back, ${name}!`} subtitle="Build skills with a clear plan, meaningful projects, and guidance from peers." />
            <div className="hero-card"><div className="hero-content"><span className="hero-label"><Sparkles size={15} /> YOUR PERSONAL LEARNING JOURNEY</span><h2>Small steps today.<br /><span>Big opportunities tomorrow.</span></h2><p>Your learning dashboard helps you stay focused on the skills that move you forward.</p><button className="hero-button" onClick={() => setActivePage('Learning Pathway')}>Continue learning <ArrowRight size={17} /></button></div><div className="hero-art"><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><div className="art-core"><GraduationCap size={47} /></div><span className="art-dot dot-one"></span><span className="art-dot dot-two"></span><span className="art-dot dot-three"></span></div></div>
            <div className="section-title"><div><h2>Your progress at a glance</h2><p>Every completed activity brings you closer to your goal.</p></div><button className="text-button" onClick={() => setActivePage('Skill Passport')}>View skill passport <ArrowRight size={15} /></button></div>
            <div className="stat-grid">
              <StatCard icon={<TrendingUp />} label="Learning progress" value={`${progress}%`} detail={`${completed} of ${tasks.length} activities done`} />
              <StatCard icon={<Target />} label="Career goal" value={career} detail="Your current target role" />
              <StatCard icon={<BookOpen />} label="Skills listed" value={skillList.length} detail="Skills in your profile" />
              <StatCard icon={<CheckCircle2 />} label="Activities left" value={tasks.length - completed} detail="Keep up the momentum" />
            </div>
            <div className="dashboard-grid"><div className="panel"><div className="panel-heading"><div><h3>Next on your pathway</h3><p>Pick up where you left off.</p></div><button className="text-button" onClick={() => setActivePage('Learning Pathway')}>View all</button></div>
              <div className="task-list">{tasks.filter(task => !task.done).slice(0, 3).map((task, index) => <label className="task-row" key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="task-number">0{index + 1}</span><span className="task-details"><strong>{task.title}</strong><small>{task.category}</small></span><span className="task-duration"><Clock size={14} /> {task.duration}</span></label>)}{completed === tasks.length && <p className="all-done"><CheckCircle2 size={17} /> All activities completed! Great work.</p>}</div>
            </div><div className="panel progress-panel"><div className="panel-heading"><div><h3>Weekly momentum</h3><p>Your overall learning progress</p></div></div><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}><div><strong>{progress}%</strong><span>completed</span></div></div><p className="progress-caption">{tasks.length - completed === 0 ? 'You finished every activity!' : `${tasks.length - completed} activities to go. You’ve got this!`}</p><button className="secondary-button full-button" onClick={() => setActivePage('Learning Pathway')}>Open my pathway <ArrowRight size={16} /></button></div></div>
          </>
        )
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><GraduationCap size={25} /></div><div><strong>ALPG</strong><span>Adaptive Learning</span></div><button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={20} /></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>{menuItems.map(item => { const Icon = item.icon; return <button key={item.name} className={`nav-item ${activePage === item.name ? 'nav-active' : ''}`} onClick={() => { setActivePage(item.name); setMobileMenu(false) }}><Icon size={19} /><span>{item.name}</span>{item.name === 'Learning Pathway' && <span className="nav-count">{tasks.length - completed}</span>}</button> })}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={18} /></div><strong>Keep growing!</strong><p>Consistency makes progress.</p><button onClick={() => setActivePage('Learning Pathway')}>View my plan <ArrowRight size={14} /></button></div><div className="profile-mini"><div className="avatar">{name.slice(0, 1).toUpperCase() || 'S'}</div><div><strong>{name}</strong><span>{career}</span></div><button title="Edit profile" onClick={() => setActivePage('Settings')}><Settings size={17} /></button></div></div>
      </aside>
      {mobileMenu && <button className="mobile-backdrop" onClick={() => setMobileMenu(false)} aria-label="Close navigation"></button>}
      <main className="main-area"><header className="topbar"><button className="mobile-menu-button" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>{activePage}</strong></div><div className="topbar-actions"><div className="date-label">STUDENT LEARNING PORTAL</div><button className="notification-button" onClick={() => showNotice('You’re all caught up! No new notifications.')} aria-label="Notifications"><Bell size={19} /><span></span></button><button className="top-avatar" title="Edit profile" onClick={() => setActivePage('Settings')}>{name.slice(0, 1).toUpperCase() || 'S'}</button></div></header>
        <div className="page-content">{renderContent()}<footer>ALPG · Adaptive Learning Pathway Generator <span>Learning is a journey, not a race.</span></footer></div>
      </main>
      {notice && <div className="toast-message"><CheckCircle2 size={18} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={16} /></button></div>}
    </div>
  )
}

function PageHeading({ eyebrow, title, subtitle }) {
  return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>
}

function StatCard({ icon, label, value, detail }) {
  return <div className="panel stat-card"><div className="stat-top"><span className="stat-icon">{icon}</span><span className="stat-label">{label}</span></div><strong className="stat-value">{value}</strong>{detail && <span className="stat-detail">{detail}</span>}</div>
}

function FeatureCard({ initials, title, role, tags, description, action, onAction }) {
  return <div className="panel feature-card"><div className="feature-card-top"><div className="feature-avatar">{initials}</div><span className="tag">Demo</span></div><h3>{title}</h3><p className="feature-role">{role}</p><p className="feature-description">{description}</p><div className="feature-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="primary-button" onClick={onAction}>{action} <ArrowRight size={15} /></button></div>
}