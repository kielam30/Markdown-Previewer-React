
import './App.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
    breaks: true,
    renderer: new marked.Renderer()
}); //interpret carriage returns as <br>

class EditorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: placeholder,
            rawInput: marked(placeholder),
            preview: true,
            rawPreview: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
        this.handleRawClick = this.handleRawClick.bind(this)
    };

    handleChange(event) {
        this.setState({
            input: event.target.value,
            rawInput: marked(event.target.value)
        });
    };
    handlePreviewClick() {
            this.setState({
                preview: true,
                rawPreview: false
            }); 
    };
    handleRawClick() {
            this.setState({
                preview: false,
                rawPreview: true
            });
    };

    render () {
        //conditional class name rendering to implement view toggling with css
        //toggling buttons
        let togglePreview = (this.state.preview) ? "active" : "";
        let toggleRawPreview = (this.state.rawPreview) ? "active" : "";
        //panels
        let classPreview = (this.state.preview) ? "" : "hide";
        let classRawPreview = (this.state.rawPreview) ? "" : "hide";
       
        return (
        <div className="app">
            <h1 id="title">Markdown Previewer</h1>
            <div className="wrapper">
                <div className="container">
                    <Navbar
                        title="Editor:"
                        subtitle="GitHub flavored markdown"
                    />
                    <div class="edit-panel">
                        <Editor
                            onChange={this.handleChange} 
                            defaultVal={this.state.input}
                        />
                    </div>
                </div>
                
                <div className="container">
                    <Navbar
                        togglePreviewClass={togglePreview}
                        togglePreviewText="Preview"
                        onClickPreview={this.handlePreviewClick}
                        toggleRawPreviewClass={toggleRawPreview}
                        toggleRawText="RawHTML"
                        onClickRaw={this.handleRawClick}
                    />
                    <div class="viewer-panel">
                        <Viewer 
                            viewId="outputView"
                            viewClass={classPreview}
                            innerDivId="preview"
                            dsih={{__html: marked(this.state.input)}}
                        />
                        <Viewer 
                            viewId="htmlView"
                            viewClass={classRawPreview}
                            innerCodeId="rawview"
                            dsihCode={{__html: hljs.highlight("html", this.state.rawInput).value}}
                        />
                    </div>
                </div>
            </div>
            <p id="footer">Jackie Lam - 10 Jul 2021</p>
        </div>
        );
    };
};

const Navbar = props => {
    return (
        <div className="nav">
            <div>
                <h2>{props.title}</h2>
                <h3>{props.subtitle}</h3>
            </div>
            <div>
                <a href="#" className={props.togglePreviewClass} onClick={props.onClickPreview}>
                <h2>{props.togglePreviewText}</h2>
                </a>
                <a href="#" className={props.toggleRawPreviewClass} onClick={props.onClickRaw}>
                    <h2>{props.toggleRawText}</h2>
                </a>
            </div>
        </div>
    );
};

const Editor = props => {
    return (
        <textarea id="editor" className="input-area" spellCheck="false"
            onChange={props.onChange} defaultValue={props.defaultVal}
        />
    );
};

const Viewer = props => {
    return (
        <div id={props.viewId} className={props.viewClass}>
            <div id={props.innerDivId} 
                dangerouslySetInnerHTML={props.dsih}
            />
            <pre>
                <code id={props.innerCodeId}
                    dangerouslySetInnerHTML={props.dsihCode}
                />
            </pre>
        </div>
    );
};

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<inline style>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

The coolest part is probably the toolbar, so go ahead and check that out. There are libraries out there that embed pre-coded toolbards like [SimpleMDE](https://simplemde.com/), but I decided to try to undertake the challenge myself, so this is definitely not perfect (some scrolling issues), but for the most part it works.

There's also [links](https://www.freecodecamp.com/no-stack-dub-sack), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

### Task List
- [x] This is a complete item
- [ ] This is an incomplete item

### Regular Lists
Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
    - And this

![React Logo](https://reactjs.org/logo-og.png)

Well, that's it! Thanks for visiting my project. The code is in desperate need of a refactor, so maybe I will improve later and add additional functionality like syntax highlighting and fix some of the bugs. For this first round, I was just exploring these techniques and focusing on getting things working. 

Feel free to play around and leave some comments if you have any thoughts!
`

ReactDOM.render(<EditorApp />, document.getElementById("root"))
export default EditorApp;
