import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default class extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Header title="Calendar">Calendar</Header>
        <div className="content">
          <div className="calendar-note">
            We are working on a better events page, but in the meantime check
            out our latest{" "}
            <a href="https://us12.campaign-archive.com/home/?u=276674ceb2a98e9d6dd11dbd5&id=f8ce6b453e">
              newsletter
            </a>{" "}
            for a curated selection of events across upstate New York. And feel
            free to email us at{" "}
            <a href="mailto:hello@scoutupstate.com">hello@scoutupstate.com</a>{" "}
            to suggest an event.
          </div>
        </div>
        <Footer />
        <style jsx>{`
          .calendar-note {
            padding: 30px;
            margin-bottom: 30px;
            background-color: #e8e8e8;
            line-height: 1.4em;
          }
          .calendar {
            width: 100%;
            height: 700px;
          }
        `}</style>
      </div>
    );
  }
}
