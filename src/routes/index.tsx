import {createFileRoute, Link} from '@tanstack/react-router'
import {Terminal} from "lucide-react";
import SkillCard from "../components/SkillCard";
import {dummySkillRecords} from "../lib/dummy-skill";


export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
      <div id="home">
          <section className="hero">
              <div className="copy">
                  <h1>
                      The register for <br/>
                      <span className="text-gradient">
                          Agentic intelligence
                      </span>

                  </h1>
                  <p>
                      A high performance register for procedural agent skill discovery, public and operate reusable agent capabilities from a remote driven workspace
                  </p>
              </div>
              <div className="actions">
                  <Link to="/skills" className="btn-primary">
                      <Terminal size={18} />
                      Browse registered skills
                  </Link>
                  <Link to="/skills/new" className="btn-secondary">
                      <Terminal size={18} />
                      Public Skill
                  </Link>
              </div>
          </section>

          <section className="latest">
              <div className="space-y-2">
                  <h2>
                      Recently created{" "}
                      <span className="text-gradient">Skills</span>
                  </h2>
                  <p>
                      {" "}
                      Latest skills created by users and organizations
                  </p>
              </div>
              <div >
                  {dummySkillRecords.length > 0 ? (
                      <div className="skills-grid">
                          {dummySkillRecords.map((skill) => (
                              <SkillCard key={skill.id} {...skill} />
                          ))}
                      </div>
                  ) : (
                      <p>No skills found. Create your first skill!</p>
                  )}
              </div>
          </section>
      </div>
  )
}
