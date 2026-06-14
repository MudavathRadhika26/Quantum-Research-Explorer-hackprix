import React, { createContext, useContext, useState, useEffect } from 'react';
import { Molecule, Extraction } from '../types';

export type Page = 'dashboard' | 'upload' | 'explorer' | 'detail' | 'comparison' | 'about';

interface AppContextType {
  molecules: Molecule[];
  extractions: Extraction[];
  compareIds: string[];
  activePage: Page;
  selectedMoleculeId: string | null;
  isLoadingMolecules: boolean;
  isLoadingExtractions: boolean;
  setPage: (page: Page) => void;
  viewMoleculeDetails: (id: string) => void;
  fetchMolecules: () => Promise<void>;
  fetchExtractions: () => Promise<void>;
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  uploadAndExtract: (filename: string, fileType: string, fileSize: number, fileContent?: string) => Promise<Extraction>;
  clearHistory: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const [extractions, setExtractions] = useState<Extraction[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string | null>(null);
  const [isLoadingMolecules, setIsLoadingMolecules] = useState(false);
  const [isLoadingExtractions, setIsLoadingExtractions] = useState(false);

  // Fetch molecules from API
  const fetchMolecules = async () => {
    setIsLoadingMolecules(true);
    try {
      const res = await fetch('/api/molecules');
      if (res.ok) {
        const data = await res.json();
        setMolecules(data);
      } else {
        console.error('Failed to fetch molecules from server');
      }
    } catch (err) {
      console.error('Network error fetching molecules:', err);
    } finally {
      setIsLoadingMolecules(false);
    }
  };

  // Fetch extractions history
  const fetchExtractions = async () => {
    setIsLoadingExtractions(true);
    try {
      const res = await fetch('/api/data/history');
      if (res.ok) {
        const data = await res.json();
        setExtractions(data);
      } else {
        console.error('Failed to fetch extraction history');
      }
    } catch (err) {
      console.error('Network error fetching extractions:', err);
    } finally {
      setIsLoadingExtractions(false);
    }
  };

  useEffect(() => {
    fetchMolecules();
    fetchExtractions();
  }, []);

  const setPage = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const viewMoleculeDetails = (id: string) => {
    setSelectedMoleculeId(id);
    setPage('detail');
  };

  const addToComparison = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 molecules at once.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromComparison = (id: string) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const clearComparison = () => {
    setCompareIds([]);
  };

  const uploadAndExtract = async (
    filename: string,
    fileType: string,
    fileSize: number,
    fileContent?: string
  ): Promise<Extraction> => {
    try {
      const res = await fetch('/api/data/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          fileType,
          fileSize,
          fileContent,
        }),
      });

      if (!res.ok) {
        throw new Error('Extraction request failed');
      }

      const newExtraction = await res.json();
      setExtractions((prev) => [newExtraction, ...prev]);
      return newExtraction;
    } catch (err) {
      console.error('Error in uploadAndExtract:', err);
      throw err;
    }
  };

  const clearHistory = async () => {
    try {
      const res = await fetch('/api/data/history', {
        method: 'DELETE',
      });
      if (res.ok) {
        setExtractions([]);
      } else {
        throw new Error('Clear history request failed');
      }
    } catch (err) {
      console.error('Error clearing history:', err);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        molecules,
        extractions,
        compareIds,
        activePage,
        selectedMoleculeId,
        isLoadingMolecules,
        isLoadingExtractions,
        setPage,
        viewMoleculeDetails,
        fetchMolecules,
        fetchExtractions,
        addToComparison,
        removeFromComparison,
        clearComparison,
        uploadAndExtract,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
