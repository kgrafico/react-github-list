import React from 'react';

interface List {
    column: Items,
}

interface Items {
  name: String,
  language: String,
  html_url: String,
  created_at: String,
  description: String
}

const Column = ({ column: { name, language, html_url, created_at, description } }: List) => {
    return (
        <React.Fragment>
            <li>
                <div>Name: {name}</div>
                {language && <div>Language: {language}</div>}
                {html_url && <div>HTML_Url: {html_url}</div>}
                {created_at && <div>Created At: {created_at}</div>}
                {description && <div>Description: {description}</div>}
            </li>
        </React.Fragment>
    )
}
export default Column;
