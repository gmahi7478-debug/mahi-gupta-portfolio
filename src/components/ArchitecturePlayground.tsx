'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionLabel } from './SectionLabel'

interface Node {
  id: string
  label: string
  cx: number
  cy: number
  description: string
  type: 'client' | 'service' | 'store' | 'broker'
}

interface Connection {
  from: string
  to: string
  label?: string
  dashed?: boolean
}

interface SimStep {
  nodeId: string
  connectionIndex: number
  description: string
}

const NODES: Node[] = [
  { id: 'client', label: 'Client App', cx: 360, cy: 40, type: 'client', description: 'Browser or mobile application that initiates requests and receives real-time notifications via WebSocket.' },
  { id: 'api', label: 'REST API', cx: 360, cy: 120, type: 'service', description: 'HTTP endpoint layer that validates requests, authenticates users, and routes to backend services.' },
  { id: 'backend', label: 'Backend Service', cx: 200, cy: 210, type: 'service', description: 'Core business logic — processes requests, enforces rules, and publishes domain events.' },
  { id: 'postgres', label: 'PostgreSQL', cx: 520, cy: 210, type: 'store', description: 'Primary data store for persistent state — user data, notification preferences, approval records.' },
  { id: 'rabbitmq', label: 'RabbitMQ', cx: 200, cy: 310, type: 'broker', description: 'Message broker that decouples event producers from consumers using durable queues.' },
  { id: 'websocket', label: 'WebSocket Service', cx: 520, cy: 310, type: 'service', description: 'Maintains persistent connections for pushing real-time notifications to clients.' },
  { id: 'processor', label: 'Notification Processor', cx: 200, cy: 400, type: 'service', description: 'Consumes queued events and routes notifications to the appropriate delivery channel.' },
  { id: 'redis', label: 'Redis', cx: 520, cy: 400, type: 'store', description: 'In-memory cache for session state, connection registry, and frequently accessed data.' },
]

const CONNECTIONS: Connection[] = [
  { from: 'client', to: 'api' },
  { from: 'api', to: 'backend' },
  { from: 'api', to: 'postgres', dashed: true, label: 'read' },
  { from: 'backend', to: 'postgres', label: 'write' },
  { from: 'backend', to: 'rabbitmq' },
  { from: 'rabbitmq', to: 'processor' },
  { from: 'processor', to: 'redis', label: 'cache' },
  { from: 'processor', to: 'websocket' },
  { from: 'websocket', to: 'client', dashed: true, label: 'real-time' },
]

const SIM_STEPS: SimStep[] = [
  { nodeId: 'client', connectionIndex: 0, description: 'Client sends an HTTP request' },
  { nodeId: 'api', connectionIndex: 1, description: 'REST API validates and routes to backend' },
  { nodeId: 'backend', connectionIndex: 3, description: 'Backend writes state to PostgreSQL' },
  { nodeId: 'postgres', connectionIndex: 4, description: 'Backend publishes domain event' },
  { nodeId: 'rabbitmq', connectionIndex: 5, description: 'RabbitMQ delivers to processor' },
  { nodeId: 'processor', connectionIndex: 6, description: 'Processor checks Redis cache' },
  { nodeId: 'redis', connectionIndex: 7, description: 'Processor routes to WebSocket service' },
  { nodeId: 'websocket', connectionIndex: 8, description: 'WebSocket pushes notification to client' },
  { nodeId: 'client', connectionIndex: -1, description: 'Client receives real-time notification' },
]

const NODE_W = 140
const NODE_H = 44
const NODE_RX = 6

function getNodeById(id: string) {
  return NODES.find((n) => n.id === id)!
}

function getConnectionPath(conn: Connection): string {
  const from = getNodeById(conn.from)
  const to = getNodeById(conn.to)

  const fx = from.cx
  const fy = from.cy + NODE_H / 2
  const tx = to.cx
  const ty = to.cy - NODE_H / 2

  if (conn.from === 'websocket' && conn.to === 'client') {
    return `M ${fx} ${fy - NODE_H} L ${fx} ${fy - NODE_H - 30} Q ${fx} ${ty + NODE_H + 10} ${tx + NODE_W / 2 + 10} ${ty + NODE_H / 2}`
  }

  if (Math.abs(fx - tx) < 10) {
    return `M ${fx} ${fy} L ${tx} ${ty}`
  }

  if (Math.abs(from.cy - to.cy) < 10) {
    const startX = conn.from === 'backend' || conn.from === 'processor' ? fx + NODE_W / 2 : fx - NODE_W / 2
    const endX = conn.to === 'postgres' || conn.to === 'redis' || conn.to === 'websocket' ? tx - NODE_W / 2 : tx + NODE_W / 2
    return `M ${startX} ${from.cy} L ${endX} ${to.cy}`
  }

  const midY = (fy + ty) / 2
  return `M ${fx} ${fy} C ${fx} ${midY} ${tx} ${midY} ${tx} ${ty}`
}

function ConnectionLabel({ conn, index, activeConn }: { conn: Connection; index: number; activeConn: number }) {
  if (!conn.label) return null
  const from = getNodeById(conn.from)
  const to = getNodeById(conn.to)
  const isHorizontal = Math.abs(from.cy - to.cy) < 10

  let lx: number, ly: number
  if (isHorizontal) {
    lx = (from.cx + to.cx) / 2
    ly = from.cy - 12
  } else if (conn.from === 'websocket' && conn.to === 'client') {
    lx = to.cx + NODE_W / 2 + 32
    ly = (from.cy + to.cy) / 2
  } else {
    lx = (from.cx + to.cx) / 2 + (from.cx < to.cx ? 14 : -14)
    ly = (from.cy + to.cy) / 2 - 4
  }

  const isActive = activeConn === index
  return (
    <text
      x={lx}
      y={ly}
      textAnchor="middle"
      className="select-none pointer-events-none"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
        fill: isActive ? 'var(--accent)' : 'var(--subtle)',
      }}
    >
      {conn.label}
    </text>
  )
}

export function ArchitecturePlayground() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [simulating, setSimulating] = useState(false)
  const [simStep, setSimStep] = useState(-1)

  const activeNodeId = simulating && simStep >= 0 ? SIM_STEPS[simStep]?.nodeId : selectedNode
  const activeConnIndex = simulating && simStep >= 0 ? SIM_STEPS[simStep]?.connectionIndex : -1
  const stepDescription = simulating && simStep >= 0 ? SIM_STEPS[simStep]?.description : null

  const startSimulation = useCallback(() => {
    if (simulating) return
    setSelectedNode(null)
    setSimulating(true)
    setSimStep(0)
  }, [simulating])

  useEffect(() => {
    if (!simulating || simStep < 0) return
    if (simStep >= SIM_STEPS.length) {
      setSimulating(false)
      setSimStep(-1)
      return
    }
    const timer = setTimeout(() => setSimStep((s) => s + 1), 1200)
    return () => clearTimeout(timer)
  }, [simulating, simStep])

  const handleNodeClick = (id: string) => {
    if (simulating) return
    setSelectedNode(selectedNode === id ? null : id)
  }

  const selectedInfo = selectedNode ? getNodeById(selectedNode) : null
  const activeInfo = activeNodeId ? getNodeById(activeNodeId) : null

  return (
    <section id="engineering" className="py-section px-5 md:px-8">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionLabel>Engineering</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-heading-1 text-foreground mt-4 mb-2">
            Event-Driven Architecture
          </h2>
          <p className="text-body-lg text-muted max-w-prose mb-10">
            A conceptual view of the notification pipeline — from client request
            to real-time delivery through message queues and WebSocket connections.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SVG Diagram */}
            <div className="lg:w-[62%] min-w-0">
              <div className="border border-subtle rounded-lg bg-surface p-4 md:p-6">
                <svg
                  viewBox="0 0 720 480"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Event-driven architecture diagram"
                >
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 8"
                      refX="10"
                      refY="4"
                      markerWidth="8"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 4 L 0 8 z" fill="var(--muted)" />
                    </marker>
                    <marker
                      id="arrow-active"
                      viewBox="0 0 10 8"
                      refX="10"
                      refY="4"
                      markerWidth="8"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 4 L 0 8 z" fill="var(--accent)" />
                    </marker>
                  </defs>

                  {/* Connections */}
                  {CONNECTIONS.map((conn, i) => {
                    const isActive = activeConnIndex === i
                    return (
                      <g key={`${conn.from}-${conn.to}`}>
                        <path
                          d={getConnectionPath(conn)}
                          fill="none"
                          stroke={isActive ? 'var(--accent)' : 'var(--subtle)'}
                          strokeWidth={isActive ? 1.8 : 1}
                          strokeDasharray={conn.dashed ? '6 4' : undefined}
                          markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow)'}
                          opacity={isActive ? 1 : 0.5}
                          style={{ transition: 'stroke 0.3s, opacity 0.3s' }}
                        />
                        <ConnectionLabel conn={conn} index={i} activeConn={activeConnIndex} />
                      </g>
                    )
                  })}

                  {/* Nodes */}
                  {NODES.map((node) => {
                    const isActive = activeNodeId === node.id
                    const isSelected = selectedNode === node.id
                    const highlight = isActive || isSelected
                    return (
                      <g
                        key={node.id}
                        onClick={() => handleNodeClick(node.id)}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={node.label}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleNodeClick(node.id)
                          }
                        }}
                      >
                        <rect
                          x={node.cx - NODE_W / 2}
                          y={node.cy - NODE_H / 2}
                          width={NODE_W}
                          height={NODE_H}
                          rx={NODE_RX}
                          fill={highlight ? 'var(--accent-muted)' : 'var(--elevated)'}
                          stroke={highlight ? 'var(--accent)' : 'var(--border-subtle)'}
                          strokeWidth={highlight ? 1.5 : 1}
                          style={{ transition: 'fill 0.25s, stroke 0.25s' }}
                        />
                        {/* Type indicator stripe */}
                        <rect
                          x={node.cx - NODE_W / 2}
                          y={node.cy - NODE_H / 2}
                          width={3}
                          height={NODE_H}
                          rx={NODE_RX}
                          fill={
                            node.type === 'broker'
                              ? 'var(--accent)'
                              : node.type === 'store'
                                ? 'var(--muted)'
                                : node.type === 'client'
                                  ? 'var(--subtle)'
                                  : 'transparent'
                          }
                          opacity={0.6}
                        />
                        <text
                          x={node.cx}
                          y={node.cy + 1}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="select-none pointer-events-none"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 12.5,
                            fill: highlight ? 'var(--foreground)' : 'var(--muted)',
                            transition: 'fill 0.25s',
                          }}
                        >
                          {node.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:w-[38%] min-w-0">
              <div className="border border-subtle rounded-lg bg-surface p-5 md:p-6 h-full flex flex-col">
                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-label text-subtle uppercase tracking-[0.1em]">
                    {simulating ? `Step ${simStep + 1} / ${SIM_STEPS.length}` : 'Components'}
                  </span>
                  <button
                    onClick={startSimulation}
                    disabled={simulating}
                    className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.06em] uppercase px-3 py-1.5 rounded border border-accent/40 text-accent hover:bg-accent-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-current" />
                    Simulate
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-h-[120px]">
                  {simulating && stepDescription ? (
                    <motion.div
                      key={simStep}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h4 className="font-display text-heading-3 text-foreground mb-2">
                        {activeInfo?.label}
                      </h4>
                      <p className="text-body text-muted">{stepDescription}</p>
                      {/* Progress bar */}
                      <div className="mt-6 h-px bg-[var(--border-subtle)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${((simStep + 1) / SIM_STEPS.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ) : selectedInfo ? (
                    <motion.div
                      key={selectedInfo.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{
                            backgroundColor:
                              selectedInfo.type === 'broker'
                                ? 'var(--accent)'
                                : selectedInfo.type === 'store'
                                  ? 'var(--muted)'
                                  : 'var(--subtle)',
                          }}
                        />
                        <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-subtle uppercase">
                          {selectedInfo.type === 'broker'
                            ? 'Message Broker'
                            : selectedInfo.type === 'store'
                              ? 'Data Store'
                              : selectedInfo.type === 'client'
                                ? 'Client'
                                : 'Service'}
                        </span>
                      </div>
                      <h4 className="font-display text-heading-3 text-foreground mb-2">
                        {selectedInfo.label}
                      </h4>
                      <p className="text-body text-muted">{selectedInfo.description}</p>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <p className="text-body-sm text-subtle mb-1">
                        Select a component to view details
                      </p>
                      <p className="text-body-sm text-subtle">
                        or simulate the event flow
                      </p>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-subtle flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    { type: 'Service', color: 'var(--subtle)' },
                    { type: 'Data Store', color: 'var(--muted)' },
                    { type: 'Broker', color: 'var(--accent)' },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-mono text-[0.625rem] tracking-[0.04em] text-subtle">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conceptual note */}
          <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.04em] text-subtle text-center">
            Conceptual demonstration — illustrates architectural patterns, not a production deployment diagram.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
