import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';



class KonfirmasiData extends Component {
  constructor(props) {
    super(props)
    this.classes = makeStyles({
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      label: {
        textTransform: 'capitalize',
      },
    });
  }
  
  render() {
    return (
      <Container>
        <span>This is 2nd Screen</span>
      </Container>
    )
  }
}

export default (KonfirmasiData)