import React from 'react';
import { getUser } from './service/common.js'
class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '首页'
    }
  }
  async componentDidMount() {
    await getUser()
  }
  render() {
    const { title } = this.state
    return (
      <div >
        <h1>{title}</h1>
      </div>
    );
  }
}
export default Test