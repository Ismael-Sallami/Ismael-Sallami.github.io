import { Component } from 'react'

// Isolates the 3D canvas: if WebGL is unavailable or three.js throws,
// the rest of the site keeps rendering (graceful degradation).
export default class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('3D scene disabled:', err?.message || err)
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
