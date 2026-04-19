import {Link} from "@tanstack/react-router";
import {ArrowBigUp, ArrowUpRight, Bookmark, Check, Copy, MessageSquare} from "lucide-react";
import {useEffect, useRef, useState} from "react";

const SkillCard = ({
                       authorEmail,
                       category,
                       createdAt,
                       description,
                       id,
                       installCommand,
                       slug,
                       tags,
                       title
} : SkillRecord ) => {
    const [copied, setCopied] = useState(false);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        };
    }, []);

    const handleCopyCommand = async () => {
        try {
            await navigator.clipboard.writeText(installCommand);
            setCopied(true);

            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }

            resetTimer.current = setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <article className="skill-card">
            <Link
                to="/skills/$skillId"
                tabIndex={-1}
                aria-label={`Open ${title}`}
                className="overlay" />
            <div className="chrome">
                <div className="chrome-bar">
                    <div className="lights">
                        <div className="light red"></div>
                        <div className="light amber"></div>
                        <div className="light green"></div>
                    </div>
                    <div className="host">register.sh</div>
                </div>
            </div>

            <div className="body">
                <div className="meta">
                    <div className="author">
                        <img src="/logo512.png" alt="author avatar" className="avatar"/>
                        <div className="author-copy">
                            <p>Khai</p>
                            <p>{new Date(createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="category">{category}</p>
                </div>
                <div className="summary">
                    <Link to="/skills" className="title-link">
                        <h3>{title}</h3>
                    </Link>
                    <p>{description}</p>
                </div>

                <div className="command">
                    <div className="command-copy">
                        <span>{">_"}</span>
                        <p>{installCommand}</p>
                    </div>
                    <button
                        type="button"
                        className={`copy${copied ? " copied" : ""}`}
                        onClick={handleCopyCommand}
                        aria-label={copied ? "Command copied" : "Copy command"}
                    >
                        {copied ? <Check size={16} className="copy-success-icon" /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="footer">
                    <div className="stats">
                        <button type="button" className="upvote" disabled >
                          <ArrowBigUp size={16} />
                            <span>{tags.length}</span>
                        </button>
                        <div className="comments">
                            <MessageSquare size={14} />
                            <span>{authorEmail ? 1 : 0}</span>
                        </div>
                    </div>
                    <div className="actions">
                        <Link to="/skills" className="open" title={`Open ${title}`}>
                            <span>Open</span>
                            <ArrowUpRight size={14} />
                        </Link>

                        <button type="button" className="save" title="Share" aria-label="Saved state" disabled>
                            <Bookmark size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}
export default SkillCard
