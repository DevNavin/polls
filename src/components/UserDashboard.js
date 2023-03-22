import { useState } from "react";
import { connect } from "react-redux";
import Card from "./Card";

const Dashboard = ({ authedUser, questions, users }) => {

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));
    const [toggle, changeToggle] = useState(1);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-15 px-3 py-2 header-bot-border" data-testid="heading">Dashboard</h1>
            <div className="flex justify-center space-x-4">
                <button className={"font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 " + (toggle === 1 ? 'toggle-btn-rr' : '')} onClick={() => changeToggle(1)}>New Questions</button>
                <button className={"font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 " + (toggle === 2 ? 'toggle-btn-rr' : '')} onClick={() => changeToggle(2)}>Answered Questions</button>
            </div>
            {
                toggle === 1 ? (
                    <>
                        <h2 className="text-2xl font-bold mt-6">New Questions</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 question-container">
                            {questions
                                .filter(unanswered)
                                .map((question) => (
                                    <li key={question.id}>
                                        <Card question={question} author={users[question.author]} />
                                    </li>
                                ))}
                        </ul>
                    </>
                ) : null
            }

            {toggle === 2 ? <>
                <h2 className="text-2xl font-bold mt-6">Answered Questions</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 question-container">
                    {questions
                        .filter(answered)
                        .map((question) => (
                            <li key={question.id}>
                                <Card question={question} author={users[question.author]} />
                            </li>
                        ))}
                </ul></> : null}
        </div>
    );
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);
