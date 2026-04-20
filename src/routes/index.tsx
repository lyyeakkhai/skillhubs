import {createFileRoute, Link, redirect} from '@tanstack/react-router'
import {Terminal} from "lucide-react";
import SkillCard from "../components/SkillCard";
import {dummySkillRecords} from "../lib/dummy-skill";
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'


const authStateFn = createServerFn().handler(async () => {
    const { isAuthenticated, userId } = await auth()

    if (!isAuthenticated) {
        throw redirect({
            to: '/sign-in/$',
        })
    }

    return { userId }
})

export const Route = createFileRoute('/')({
    component: App,
    beforeLoad: async () => await authStateFn(),
    loader: async ({ context }) => {
        return { userId: context.userId }
    },
})

function App() {
    const state = Route.useLoaderData()

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
