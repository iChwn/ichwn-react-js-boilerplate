import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Button from "../../components/Button/BasicButton";
import * as Actions from '../../module/counter/actions';

class Dashboard extends Component {
  
  render() {  
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <h1>Hello Dashboard</h1>
          <div className="flex -space-x-1 overflow-hidden">
            <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
           
          </div>
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
          <Button
              mt={2}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={_ => {
                this.props.history.push('/konfirmasi-data')
              }}
            >
              Konfirmasi Data
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