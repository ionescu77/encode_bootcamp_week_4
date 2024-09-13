export let assistantId = "asst_QyxdRg3PZaO2dCnrxKus9PFA"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
