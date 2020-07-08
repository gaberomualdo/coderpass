// function for getting properties HTML for a given properties object
const getHTMLOfPropertiesSection = (properties) => {
  let propertiesHTML = '';

  const addPropertyToPropertiesHTML = (propertyName, propertyValue, options = {}) => {
    propertyValue = propertyValue.toString();
    propertyName = propertyName.toString();

    let nameHTML = "<p class='name'>" + propertyName + ':</p>';

    let nameClassname = '';
    if ('withName' in options && !options.withName) {
      nameHTML = '';
      nameClassname = 'no_name';
    }

    // less left padding if there is no subobj property
    let subobjClassname = '';
    if ('hasSubobj' in options && !options.hasSubobj) {
      subobjClassname = 'less_left_padding';
    }

    propertiesHTML +=
      '<li class="' +
      subobjClassname +
      ' ' +
      nameClassname +
      '">' +
      nameHTML +
      "<p class='value default_style_code'><span class='password'>" +
      propertyValue +
      "</span><span class='hidden'>" +
      '&bull;'.repeat(propertyValue.length) +
      "</span></p><button class='copy_property_btn' onclick='updateTooltipPosForCopyPropertyBtn(this);eventCopyPropertyValueBtn(this);' aria-label='Copied!'>" +
      copyClipboardSVG +
      '</button></li>';
  };

  let copyClipboardSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>';

  let hasSubobj = false;

  Object.keys(properties).forEach((propertyName) => {
    const propertyValue = properties[propertyName];
    if (typeof propertyValue === 'object') {
      hasSubobj = true;
    }
  });

  Object.keys(properties).forEach((propertyName) => {
    const propertyValue = properties[propertyName];
    if (typeof propertyValue == 'object') {
      nameHTML = "<p class='name'>" + propertyName + ':</p>';

      if (Array.isArray(properties)) {
        let nameInner = '{...}';
        if (Array.isArray(propertyValue)) {
          nameInner = '[...]';
        }
        nameHTML = `<p class='name italic'>${nameInner}</p>`;
      }

      propertiesHTML += "<li class='subobj_label' onclick='toggleListExpansion(this);'>" + nameHTML + '</li>';
      propertiesHTML += '<ul>';
      propertiesHTML += getHTMLOfPropertiesSection(propertyValue);
      propertiesHTML += '</ul>';
    } else {
      if (Array.isArray(properties)) {
        addPropertyToPropertiesHTML(propertyName, propertyValue, { withName: false, hasSubobj });
      } else {
        addPropertyToPropertiesHTML(propertyName, propertyValue, { hasSubobj });
      }
    }
  });

  return propertiesHTML;
};

// function for getting the HTML for the block of a given account object
const getHTMLOfAccountBlock = (accountID, justDisplayHTML) => {
  // account obj
  const accountObj = vaultContents.accounts[accountID];

  // check if account properties has a subobject at the first level
  let hasSubobj = false;

  Object.keys(accountObj.properties).forEach((propertyName) => {
    const propertyValue = accountObj.properties[propertyName];
    if (typeof propertyValue === 'object') {
      hasSubobj = true;
    }
  });

  // display HTML
  const displayHTML = `
    <section class="display">
        <h1 class="account_name open" onclick="toggleListExpansion(this);">${accountObj.name}</h1>
        <ul class="account_properties open ${hasSubobj ? 'has_subobj' : ''}">
            ${getHTMLOfPropertiesSection(accountObj.properties)}
        </ul>
    </section>
    `;

  // if just display HTML, return just display HTML
  if (justDisplayHTML) {
    return displayHTML;
  }

  // return HTML
  return `
    <div class="account" id="accountid_${accountID}">
        <div class="buttons">
            <button class="edit default_style_button with_icon" onclick="eventEditBtn('${accountID}')">
                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>
                <svg class="done_editing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </button>
            <button class="remove default_style_button with_hover with_icon" onclick="eventRemoveBtn('${accountID}', this)" aria-label="Delete Account" data-balloon-pos="down">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </button>
        </div>
        ${displayHTML}
        <section class="edit">
            <div class="editor_container">
                <div class="editor" id='aceeditor__${accountID}'></div>
            </div>
        </section>
    </div>
    `;
};
