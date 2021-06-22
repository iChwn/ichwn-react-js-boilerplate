import { Button, Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../../module/counter/actions';

class Dashboard extends Component {
  
  componentDidMount() {
    console.log(this.props)
  }
  
  render() {  
    return (
      <div>
      <Container component="main" maxWidth="xs">
        <h1>Hello Dashboard</h1>
        <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={_ => {
              localStorage.removeItem('apps:auth')
              this.props.history.push('/')
            }}
          >
            Remove localStorage
        </Button>
      </Container>        
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		count: state.counter.count,
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)