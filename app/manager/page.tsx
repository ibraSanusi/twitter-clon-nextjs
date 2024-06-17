'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { User, UserRanking } from '@/lib/interfaces'

Chart.register(...registerables)

const ManagerPage: React.FC = () => {
  const [users, setUsers] = useState<UserRanking[]>([])
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    getTopRanking()
  }, [])

  const getTopRanking = async () => {
    try {
      const response = await axios.get<UserRanking[]>(
        '/api/get/user/mostFollowed',
      )
      const users = response.data
      const orderedUsers = users.sort(
        (a, b) => b.followersCount - a.followersCount,
      )
      setUsers(orderedUsers)
      createChart(orderedUsers)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  }

  const createChart = (users: UserRanking[]) => {
    const labels = users.map((user) => user.username)
    const followersCount = users.map((user) => user.followersCount)

    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Followers Count',
              data: followersCount,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Top 5 Users by Followers Count',
            },
          },
        },
      })
    }
  }

  return (
    <div>
      <canvas ref={chartRef} id="myChart" width="400" height="200"></canvas>
    </div>
  )
}

export default ManagerPage
