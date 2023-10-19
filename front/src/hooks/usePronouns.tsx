import { useCallback, useEffect, useState } from "react";
import { pronounsApi } from "../api/pronounsApi";
import { Pronoun } from "../api/pronounsApi/types";

export const usePronouns = () => {
  const [pronouns, setPronouns] = useState<Array<Pronoun>>([]);

  const getPronounsFromTwitchName = useCallback(async (userName: string) => {
    if (!pronouns.length) return;

    const { data } = await pronounsApi.getUser(userName);
    if (!data) return;

    const userPronoun = data.find((item) => item.login === userName);
    if (!userPronoun) return;

    const pronoun = pronouns.find((item) => item.name === userPronoun.pronoun_id);
    return pronoun?.display;
  }, [pronouns]);

  useEffect(() => {
    (async () => {
      const data = await pronounsApi.getPronouns();
      if (data.hasError || !data.data) {
        return;
      }

      setPronouns(data.data);
    })();
  }, []);

  return {
    getPronounsFromTwitchName
  };
};