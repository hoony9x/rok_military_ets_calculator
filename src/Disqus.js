import React  from 'react';

class Disqus extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="disqus_thread" />
        {(function() { // DON'T EDIT BELOW THIS LINE
          const d = document, s = d.createElement('script');
          s.src = 'https://rok-military-ets-calculator.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })()}
      </React.Fragment>
    )
  }
}

export default Disqus;
