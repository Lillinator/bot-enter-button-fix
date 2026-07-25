import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "revert-ai-bot-enter-submit",
  initialize() {
    withPluginApi("1.13.0", () => {
      
      document.addEventListener("beforeinput", (e) => {
        const target = e.target;
        if (!target) return;

        const isFirstMessageUI = target.id === "ai-bot-conversations-input";
        const isDockedUI = target.closest(".ai-bot-docked-composer");
        
        if (isFirstMessageUI || isDockedUI) {
          if (e.inputType === "insertLineBreak") {
            e.stopImmediatePropagation(); 
          }
        }
      }, { capture: true });
      
    });
  }
};
