import React, { Component } from 'react';

import "../css/Table.css";
import Tree from "react-d3-tree";
import { ImageCropRotate } from 'material-ui/svg-icons';
import { blue } from '@material-ui/core/colors';

class NodeLabel extends React.PureComponent {
  render() {
    const {className, nodeData} = this.props
    return (
      <div className={className}>
        <p style={{color: "white"}}>{nodeData.name}</p>
      </div>
    )
  }
}

let data = {
  name: 'Insuralink Contracts',
  text: {
    dy:  ".35em",
    textAnchor: "middle"
  },
  nodeSvgShape: {
    shape: 'rect',
    shapeProps: {
      width: 200,
      height: 350,
      x: -195,
      y: -175,
      fill: "#f0f0f0",
    },
  },
	children: [{
    name: 'Eth Network',
    nodeSvgShape: {
      shapeProps: {
        r: 35,
        // x: 25,
        // y: 25,
        fill: "#f0f0f0",
      },
    },
    children: [{
      name: 'Node Hosts',
      nodeSvgShape: {
        shapeProps: {
          r: 35,
          // x: 25,
          // y: 25,
          fill: "#f0f0f0",
        },
      },
      children: [{
        name: 'Endpoint',
        nodeSvgShape: {
          shapeProps: {
            r: 35,
            // x: 25,
            // y: 25,
            fill: "#f0f0f0",
          },
        },
        children: [{
          name: "sensor A",
          nodeSvgShape: {
            shapeProps: {
              r: 25,
              // x: 25,
              // y: 25,
              fill: "#f0f0f0",
            },
          },
        }, {
          name: "sensor B",
          nodeSvgShape: {
            shapeProps: {
              r: 25,
              // x: 25,
              // y: 25,
              fill: "#f0f0f0",
            },
          },
        }]
      }]
    }]
  }, {
    name: 'Eth Net',
    nodeSvgShape: {
      shapeProps: {
        r: 35,
        // x: 25,
        // y: 25,
        fill: "#f0f0f0",
      },
    },
    children: [{
      name: 'Node Hosts',
      nodeSvgShape: {
        shapeProps: {
          r: 35,
          // x: 25,
          // y: 25,
          fill: "#f0f0f0",
        },
      },
      children: [{
        name: 'Endpoint',
        nodeSvgShape: {
          shapeProps: {
            r: 35,
            // x: 25,
            // y: 25,
            fill: "#f0f0f0",
          },
        },
        children: [{
          name: "sensor A",
          nodeSvgShape: {
            shapeProps: {
              r: 25,
              // x: 25,
              // y: 25,
              fill: "#f0f0f0",
            },
          },
        }, {
          name: "sensor B"
          ,nodeSvgShape: {
            shapeProps: {
              r: 25,
              // x: 25,
              // y: 25,
              fill: "#f0f0f0",
            },
          },
        }]
      }]
    }]
  }]
};

const containerStyles = {
  width: '100%',
  height: '80vh', 
  paddingTop: "2%",
}


class CenteredTree extends Component {
  state = {}

  componentDidMount() {
      const dimensions = this.treeContainer.getBoundingClientRect();
      this.setState({
      translate: {
          x: dimensions.width / 3,
          y: dimensions.height / 2
      }
      });
  }

  render() {
      return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
          <Tree 
          data={data} 
          translate={this.state.translate} 
          orientation={'horizontal'}
          zoomable={false}
          collapsible={false}
          pathFunc={"elbow"}
          allowForeignObjects
          nodeLabelComponent={{
            render: <NodeLabel className='myLabelComponentInSvg' />,
            foreignObjectWrapper: {
              y: -62,
              //x: 10
            }
          }}
          />
      </div>
      );
  }
}

export default (CenteredTree);