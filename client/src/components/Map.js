import React, { Component } from 'react';

export default class Map extends Component {
  // Lazy loading.
  // Once the script is loaded & the reference to the map is gotten. the JS Maps Api is ours
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  // the script is loaded
  onScriptLoad() {
    const map = new window.google.maps.Map(
      // pass down map div id and options
      document.getElementById(this.props.id),
      this.props.options
    );
    this.props.onMapLoad(map);
  }

  componentDidMount() {
    // check if the google object of the window is defined (script is loaded)
    if (!window.google) {
      // js script
      var s = document.createElement('script');
      s.type = 'text/javascript';
      //  google url
      s.src = `https://maps.google.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_KEY
      }`;
      // move the script tag to the script tag containing x
      // the apretn container being the that of this component
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // important !!!
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad();
      });
    } else {
      // already loaded
      this.onScriptLoad();
    }
  }

  render() {
    // again the id is passed down as a prop
    return <div style={{ width: '100%', height: '50vh' }} id={this.props.id} />;
  }
}
