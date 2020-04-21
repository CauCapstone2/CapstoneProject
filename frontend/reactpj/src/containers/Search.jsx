import React, { Component } from 'react';
import { Input } from 'antd';
import '../css/MainPage.css';
import ArtifactList from './ArtifactListView';
import {connect} from 'react-redux';

const { Search } = Input;

class SearchPage extends Component {


  render() {
    return(
        <div align = 'middle' style = {{backgroundColor : 'rgba(0,0,0,0.05)', minHeight : '87vh'}}>
            <Search placeholder = "enter keywords to Search"
                    onSearch = {value => console.log(value)}
                    style = {{width : '30vh', marginTop : '5vh', marginBottom : '5vh'}}
                    enterButton>
            </Search>
            <ArtifactList></ArtifactList>
        </div>
    );
  }
}
export default SearchPage;