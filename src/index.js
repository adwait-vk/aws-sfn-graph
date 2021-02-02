import React, { useState, useEffect, useRef } from 'react'
import './css/graph-0.1.5.css'
import './css/state-machine-render.css'
import './lib/sfn-0.1.5'

const AWSSfnGraph = (props) => {
  const { data, width, height, onError, hideToolbar = false } = props

  const containerId = useRef()
  const [graph, setGraph] = useState(null)

  useEffect(() => {
    renderStateMachine()
  }, [data, width, height])

  const handleCenter = () => {
    renderStateMachine()
  }

  const handleZoomIn = () => {
    if (graph) {
      graph.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (graph) {
      graph.zoomOut()
    }
  }

  const renderStateMachine = () => {
    try {
      const options = {
        width,
        height,
        resizeHeight: false,
        hideTooltip: true
      }
      let json

      if (!data) {
        return
      }

      if (typeof data === 'string') {
        if (data.trim().length === 0) {
          return
        }
        json = JSON.parse(data)
      } else if (typeof data === 'object') {
        json = data
      } else {
        return
      }

      const sfnGraph = new globalThis.sfn.StateMachineGraph(
        json,
        containerId.current,
        options
      )
      setGraph(sfnGraph)
      sfnGraph.render()
    } catch (e) {
      if (onError) {
        onError(e)
      }
    }
  }

  return (
    <div className='workflowgraph'>
      <div ref={containerId} style={{ flexGrow: 1, padding: 0 }}>
        <svg />
      </div>
      {hideToolbar ? (
        <div />
      ) : (
        <div className='graph-buttons-container'>
          <button onClick={handleCenter}>
            <svg
              focusable='false'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <polyline points='10 5 15 5 15 0' />
              <path d='M15,8a6.95692,6.95692,0,0,1-7,7A6.95692,6.95692,0,0,1,1,8,6.95692,6.95692,0,0,1,8,1a6.86937,6.86937,0,0,1,6.3,4' />
            </svg>
          </button>
          <button onClick={handleZoomIn}>
            <svg
              focusable='false'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <line x1='8' y1='1' x2='8' y2='15' />
              <line x1='15' y1='8' x2='1' y2='8' />
            </svg>
          </button>
          <button onClick={handleZoomOut}>
            <svg
              focusable='false'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <line x1='15' y1='8' x2='1' y2='8' />
            </svg>
          </button>
          <button onClick={handleCenter}>
            <svg
              focusable='false'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
            >
              <circle cx='8' cy='8' r='7' strokeWidth='2' />
              <circle cx='8' cy='8' r='1' strokeWidth='2' />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

AWSSfnGraph.displayName = 'AWSSfnGraph'

export default AWSSfnGraph
