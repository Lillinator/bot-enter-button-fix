import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "revert-ai-bot-enter-submit",
  initialize() {
    withPluginApi("1.13.0", () => {
      
      document.addEventListener("beforeinput", (e) => {
        const target = e.target;
        if (target && target.id === "ai-bot-conversations-input") {
          if (e.inputType === "insertLineBreak") {
            e.stopImmediatePropagation(); 
          }
        }
      }, { capture: true });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          const target = e.target;
          if (target && target.closest && target.closest(".ai-bot-docked-composer")) {
            e.stopImmediatePropagation();
          }
        }
      }, { capture: true });
      
    });
  }
};
