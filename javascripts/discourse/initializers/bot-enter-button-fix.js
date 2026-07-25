import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "revert-ai-bot-enter-submit",
  initialize() {
    withPluginApi("1.13.0", () => {
      
      // intercept the 'beforeinput' event in the capturing phase
      document.addEventListener("beforeinput", (e) => {
        const target = e.target;
        
        // target the exact id of the textarea from ai-bot-conversations.gjs
        if (target && target.id === "ai-bot-conversations-input") {
          
          // "insertLineBreak" is the event triggered by pressing the enter key
          if (e.inputType === "insertLineBreak") {
            
            // halt the event here so the discourse-ai plugin never sees it
            e.stopImmediatePropagation();
            
            // the browser will natively insert a line break!
          }
        }
      }, { capture: true });
      
    });
  }
};
