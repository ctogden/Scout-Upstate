import Header from '../../components/header'
import Footer from '../../components/footer'
import Link from 'next/link'

const Index = () => <div className="wrapper">
  <Header title="About">About</Header>
  <div className="content">
    <div className="snippet clearfix">
      <div className="snippet-label-box">
        <div className="snippet-label">purpose</div>
      </div>
      <div className="snippet-body">
        Scout Upstate exists to promote tourism and build community in Upstate
        New York.
      </div>
    </div>
    <div className="snippet clearfix">
      <div className="snippet-label-box">
        <div className="snippet-label">now</div>
      </div>
      <div className="snippet-body">
        Building up our directory of places to visit, with a focus on Delaware
        County and the surrounding area.
      </div>
    </div>
    <div className="snippet clearfix">
      <div className="snippet-label-box">
        <div className="snippet-label">newsletter</div>
      </div>
      <div className="snippet-body">
        Sign up for our weekly newsletter,{' '}
        <a href="http://eepurl.com/donZ2f">The Weekender</a>.
      </div>
    </div>
    <div className="snippet clearfix">
      <div className="snippet-label-box">
        <div className="snippet-label">contributors</div>
      </div>
      <div className="snippet-body">
        Scout Upstate was created by{' '}
        <a href="http://ctogden.com">Chris Ogden</a> (code & content) and{' '}
        <a href="https://theokeden.com/">Elisabeth Ogden</a> (guide content).
      </div>
    </div>
    <div className="snippet clearfix">
      <div className="snippet-label-box">
        <div className="snippet-label">contact</div>
      </div>
      <div className="snippet-body">
        Send us an{' '}
        <a href="mailto:ogdenchris+scoutupstate@gmail.com">email</a> or reach
        out on <a href="https://twitter.com/scout_upstate">Twitter</a>.
      </div>
    </div>
  </div>
  <Footer />
  <style jsx>{`
    .snippet {
      width: 460px;
      margin: 0 auto;
      margin-top: 20px;
    }
    .snippet-label-box {
      float: left;
      width: 100px;
    }
    .snippet-label {
      float: right;
      padding-right: 20px;
      color: #828282;
    }
    .snippet-body {
      float: right;
      width: 360px;
    }

    @media (max-width: 600px) {
      .snippet {
        width: 300px;
      }
      .snippet-body {
        width: 200px;
      }
    }
    @media (max-width: 400px) {
      .snippet {
        width: 240px;
      }
      .snippet-body {
        width: 140px;
      }
    }
  `}</style>
</div>;

export default Index;
