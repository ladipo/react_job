import { useState, useEffect } from 'react';
import PropType from 'prop-types';
import JobListing from '../components/JobListing';
import Spinners from '../components/Spinners';

const JobListings = ({isHome = false}) => { 
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
      try {
        const res = await fetch(apiUrl)
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);
  return (
    <>
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        {isLoading ? (<Spinners isloading={isLoading} />) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
        </div>
        )}
      </div>
    </section>
    </>
  )
}

JobListings.propTypes = {
  isHome: PropType.bool,
};

export default JobListings