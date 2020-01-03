// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import Editor from "rich-markdown-editor";

const defaultValue = `
# Welcome
This is example content. It is persisted between reloads in localStorage.
`;

class Example extends React.Component {
  state = {
    readOnly: false,
    dark: false,
  };

  handleToggleReadOnly = () => {
    this.setState({ readOnly: !this.state.readOnly });
  };

  handleToggleDark = () => {
    const dark = !this.state.dark;
    this.setState({ dark });
  };

  // TODO: debounce and send to API
  handleChange = console.log

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <p>
          <button type="button" onClick={this.handleToggleReadOnly}>
            {this.state.readOnly ? "Editable" : "Read Only"}
          </button>
          <button type="button" onClick={this.handleToggleDark}>
            {this.state.dark ? "Light Theme" : "Dark Theme"}
          </button>
        </p>
        <Editor
          id="example"
          readOnly={this.state.readOnly}
          defaultValue={defaultValue}
          onSave={options => console.log("Save triggered", options)}
          onCancel={() => console.log("Cancel triggered")}
          onClickLink={href => console.log("Clicked link: ", href)}
          onClickHashtag={tag => console.log("Clicked hashtag: ", tag)}
          onShowToast={message => window.alert(message)}
          onSearchLink={async term => {
            console.log("Searched link: ", term);
            return [
              {
                title: term,
                url: "localhost",
              },
            ];
          }}
          uploadImage={file => {
            console.log("File upload triggered: ", file);

            // Delay to simulate time taken to upload
            return new Promise(resolve => {
              setTimeout(() => resolve("http://lorempixel.com/400/200/"), 1500);
            });
          }}
          dark={this.state.dark}
          autoFocus
          toc
        />
      </div>
    );
  }
}

export default Example
