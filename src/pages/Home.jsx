import './Home.scss'
import { Table } from 'antd'
import React, { useEffect, useState } from "react";
import { Progress } from 'antd'
import { Select } from 'antd'
 
const BASE_URL = 'https://api.sampleapis.com/wines';


export default function Home() {

  const [wines, setWines] = useState([])
  const [type, setType] = useState('reds')

  const { Option } = Select;

  useEffect(() => {
    fetchData();
  }, [type])

  // id: 1
  // image: "https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg"
  // location: "Spain\n·\nEmpordà"
  // rating:
  // average: "4.9"
  // reviews: "88 ratings"
  // [[Prototype]]: Object
  // wine: "Emporda 2012"
  // winery: "Maselva"

  const fetchData = () => {
    fetch(`${BASE_URL}/${type}`)
      .then(resp => resp.json())
      .then(data => setWines(data));
  }

  const onChange = (value) => {
    setType(value)
  }

  console.log(wines);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} alt="image" width={80} height={220}/>
      )
    },
    {
      title: 'Winery',
      dataIndex: 'winery',
      key: 'winery',
    },
    {
      title: 'Wine',
      dataIndex: 'wine',
      key: 'wine',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => {
        const percent = (rating.average * 100 / 5).toFixed(1)
        return (
          <div>
            <Progress type='circle' percent={percent} width={100}/>
            <span>{rating.reviews}</span>
            {' || '}
              
            <span>{rating.average}</span>
            
          </div>
        )
      }
    },
  ];

  return (
    <div className='container'>

      <Select placeholder='Select a wine' onChange={onChange}>
        <Option value='reds'>reds</Option>
        <Option value='whites'>whites</Option>
        <Option value='sparkling'>sparkling</Option>
      </Select>

      <Table dataSource={wines} columns={columns} />
    </div>
  )
}