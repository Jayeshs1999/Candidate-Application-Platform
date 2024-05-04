import React from 'react';
import JobList from './components/JobList';

function App() {
  const jobs = [
    {
      title: "Job title",
      companyName: "Company name",
      location: "Location",
      description:
        "This cow ers covers a wide range of topics, from basic concepts to advanced techniques. Whether you’re a beginner or an experienced developer, mastering these questions will enhance your readiness for React interviews and boost your confidence.For further reading, check out our dedicated article on Advanced ReactJS Intermediate Interview Questions. Inside, you’ll discover over 20 questions with detailed answers.",
      experience: "exp",
      id: 1,
    },
    {
      title: "Job title",
      companyName: "Company name",
      location: "Location",
      description:
        "This compilation of React Interview Questions and Answers covers a wide range of topics, from basic concepts to advanced techniques. Whether you’re a beginner or an experienced developer, mastering these questions will enhance your readiness for React interviews and boost your confidence.For further reading, check out our dedicated article on Advanced ReactJS Intermediate Interview Questions. Inside, you’ll discover over 20 questions with detailed answers.",
      experience: "exp",
      id: 2,
    },
    {
      title: "Job title",
      companyName: "Company name",
      location: "Location",
      description:
        "This compilation of React Interview Questions and Answers covers a wide range of topics, from basic concepts to advanced techniques. Whether you’re a beginner or an experienced developer, mastering these questions will enhance your readiness for React interviews and boost your confidence.For further reading, check out our dedicated article on Advanced ReactJS Intermediate Interview Questions. Inside, you’ll discover over 20 questions with detailed answers.",
      experience: "exp",
      id: 3,
    },
  ];
  return (
    <div className="App">
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
