import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import './App.css';

type Contester = {
  name: string,
  score: number,
}

function App() {
  const [contesters, setContesters] = useState<Array<Contester>>([]);
  const [input, setInput] = useState<string>('');
  const localStorageString = 'scorekeerer';

  useEffect(() => {
    const items = localStorage.getItem(localStorageString);
    if (items) {
      setContesters(JSON.parse(items));
    }
  }, [])

  const writeToLocal = (items: Contester[]) => {
    localStorage.setItem(localStorageString, JSON.stringify(items))
  }

  useEffect(() => {
    writeToLocal(contesters);
  }, [contesters])

  const onAddPerson = () => {
    setContesters([...contesters, { name: input, score: 0 }]);
    setInput('');
  }

  const removePerson = (person: Contester) => {
    setContesters(contesters.filter((contester) => contester.name !== person.name));
  }

  const addPoint = (person: Contester, point: number) => {
    const newContesters = contesters.map((contester) => {
      if (contester.name === person.name) {
        contester!.score += point
      }
      return contester;
    });

    setContesters(newContesters)
  }

  return (
    <div className="App">
      <header className="App-header">ScoreKeeper</header>
      <div className="container">
        <div className="input">
          <Input type={'text'} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAddPerson();
            }
          }} onChange={(e) => setInput(e.target.value)} value={input} />
          <Button style={{ marginLeft: 10 }} type="primary" shape="circle" icon={
            <PlusOutlined />} onClick={onAddPerson} />
        </div>
        <div className="contesters">
          {contesters.map(contester => {
            return (
              <div className="contester" key={contester.name}>
                <Button style={{ marginRight: 10 }} type={'primary'} shape={'circle'} icon={
                  <DeleteOutlined />} onClick={() => removePerson(contester)} />
                <div className="contester-name">
                  {contester.name}
                </div>
                <div className="contester-score">
                  {contester.score}
                </div>
                <div className="contester-buttons">
                  <Button size={'large'} type="primary" icon={
                    <PlusOutlined />} onClick={() => addPoint(contester, 1)} />
                  <Button size={'large'} style={{ marginLeft: 10 }} type="primary" icon={
                    <MinusOutlined />} onClick={() => addPoint(contester, -1)} />
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
