import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as Actions from '../module/counter/actions';

function NotFoundPage(props) {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>404 Page</div> 
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={_ => {
          handleClick()
        }}
      >
        Back to Home
      </Button>
    </Container>
  );
}

const mapStateToProps = state => {
	return {
		count: state.counter.count,
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage)