import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "revert-ai-bot-enter-submit",
  initialize() {
    withPluginApi("1.13.0", () => {
      
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          const target = e.target;
          
          if (!target || target.tagName !== "TEXTAREA") return;
          
          const isFirstMessage = target.id === "ai-bot-conversations-input";
          const isDocked = target.closest(".ai-bot-docked-composer") || target.closest(".docked-composer");
          
          if (isFirstMessage || isDocked) {
            
            e.preventDefault();
            e.stopImmediatePropagation();
            
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const val = target.value;
            
            target.value = val.substring(0, start) + "\n" + val.substring(end);
            
            target.selectionStart = target.selectionEnd = start + 1;
            
            target.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
          }
        }
      }, { capture: true });
      
    });
  }
};
