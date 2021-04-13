"use strict";

// Tasks definition
const TASKS = [
  // id, description, important, private, deadline
  [1, "Complete Lab 3", false, true, "2021-03-29T14:30:00"],
  [2, "Buy some groceries", false, false, "2021-03-30T14:00:00"],
  [3, "Read a good book!", true, true],
  [4, "Watch Mr. Robot", false, true, "2021-03-25T21:30:00"],
  [5, "Program some Js", true, true, "2021-04-20T21:30:00"]
];

// --- Definining Task & Task List --- //

function Task(id, description, isImportant = false, isPrivate = true, deadline = '') {
  this.id = id;
  this.description = description;
  this.important = isImportant;
  this.private = isPrivate;
  // deadline is saved as day.js object
  this.deadline = deadline && dayjs(deadline);

  // Getters
  this.isImportant = () => { return this.important; }
  this.isPrivate   = () => { return this.private;   }

  /** 
   * Function to check if a date is today. Returns true if the date is today, false otherwise.
   * @param {*} date the javascript Date to be checked
   */
  this.isToday =  () => {
      const comparisonTemplate = 'YYYY-MM-DD';
      const now = dayjs();
      return this.deadline && (this.deadline.format(comparisonTemplate) === now.format(comparisonTemplate));
  }

  /** 
   * Function to check if a date is yesterday. Returns true if the date is yesterday, false otherwise.
   * @param {*} date the javascript Date to be checked
   */
   this.isYesterday = () => {
      const comparisonTemplate = 'YYYY-MM-DD';
      const yesterday = dayjs().subtract(1, 'day');
      return this.deadline && (this.deadline.format(comparisonTemplate) === yesterday.format(comparisonTemplate));
  }

  /** 
   * Function to check if a date is tomorrow. Returns true if the date is tomorrow, false otherwise.
   * @param {*} date the javascript Date to be checked
   */
  this.isTomorrow = () => {
      const comparisonTemplate = 'YYYY-MM-DD';
      const tomorrow = dayjs().add(1, 'day');
      return this.deadline && (this.deadline.format(comparisonTemplate) === tomorrow.format(comparisonTemplate));
  }

  /**
   * Function to check if a date is in the next week. Returns true if the date is in the next week, false otherwise.
   * @param {*} date the javascript Date to be checked
   */
   this.isNextWeek = () => {
       const tomorrow = dayjs().add(1, 'day');
       const nextWeek = dayjs().add(7, 'day');
       const ret = this.deadline && ( !this.deadline.isBefore(tomorrow,'day') && !this.deadline.isAfter(nextWeek,'day') );
       console.dir(this.deadline);
       console.log(ret);
       return ret;
   }

   /**
   * Function to setup the output format of the deadline attribute in the task
   */
   this.formatDeadline = () => {
      if(!this.deadline) return '--o--';
      else if(this.isToday(this.deadline)) {
          return this.deadline.format('[Today at] HH:mm');
      } else if(this.isTomorrow(this.deadline)) {
          return this.deadline.format('[Tomorrow at] HH:mm');
      } else if(this.isYesterday(this.deadline)) {
          return this.deadline.format('[Yesterday at] HH:mm');
      } else {
          return this.deadline.format('dddd DD MMMM YYYY [at] HH:mm');
      }
  }
}

function TaskList() {
  this.list = [];

  this.add = (task) => {
      if (!this.list.some(t => t.id == task.id))
          this.list = [...this.list, task];
      else throw new Error('Duplicate id');
  };


  this.filterAll = () => {
      // With this approach we return a copy of the list, not the list itself.
      return this.list.filter( () => true);
  }

  this.filterByImportant = () => {
      return this.list.filter((task) => task.isImportant());
  }

  this.filterByToday = () => {
      return this.list.filter( (task) => task.isToday() );
  }

  this.filterByNextWeek = () => {
      return this.list.filter( (task) => task.isNextWeek() );
  }

  this.filterByPrivate = () => {
      return this.list.filter( (task) => task.isPrivate() );
  }

}