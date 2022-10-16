class Form {
  #form;
  #nameError;
  #rows;
  #rowsError;
  #cols;
  #colsError;
  #gameName;
  #nameInp
  #numCols;
  #numRows;

  constructor() {
    this.#form = document.getElementById("form");
    this.#nameInp = document.getElementById("inp-name");
    this.#nameError = document.querySelector("#inp-name + div.error");
    this.#rows = document.getElementById("inp-rows");
    this.#rowsError = document.querySelector("#inp-rows + div.error");
    this.#cols = document.getElementById("inp-cols");
    this.#colsError = document.querySelector("#inp-cols + div.error");
    this.#numCols = 0;
    this.#numRows = 0;
    this.#gameName = "";
  }

  get numCols() {
    return this.#numCols;
  }
  get numRows() {
    return this.#numRows;
  }
  get gameName() {
    return this.#gameName;
  }

  get rows(){
    return this.#rows
  }

  checkNameValidity() {
    if (this.#nameInp.checkValidity()) {
      this.#nameError.textContent = "";
      this.#nameError.className = "error";
      return true;
    }

    if (this.#nameInp.validity.valueMissing) {
      this.#nameError.textContent = "You need to enter name";
    }
    this.#nameError.className = "error active";
    return false;
  }

  checkRowsValidity() {
    if (this.#rows.checkValidity()) {
      this.#rowsError.textContent = "";
      this.#rowsError.className = "error";
      return true;
    }

    if (this.#rows.validity.valueMissing) {
      this.#rowsError.textContent = "Enter number of rows";
    }
    if (this.#rows.validity.rangeUnderflow) {
      this.#rowsError.textContent = "Please enter more than 5 rows";
    }
    this.#rowsError.className = "error active";
    return false;
  }

  checkColsValidity() {
    if (this.#cols.checkValidity()) {
      this.#colsError.textContent = "";
      this.#colsError.className = "error";
      return true;
    }

    if (this.#cols.validity.valueMissing) {
      this.#colsError.textContent = "Enter number of cols";
    }
    if (this.#cols.validity.rangeUnderflow) {
      this.#colsError.textContent = "Please enter more than 5 cols";
    }
    this.#colsError.className = "error active";
    return false;
  }

  checkFormValidity() {
    this.#nameInp.addEventListener("input", () => this.checkNameValidity);
    this.#rows.addEventListener("input", () => this.checkRowsValidity);
    this.#cols.addEventListener("input",() => this.checkColsValidity);

    this.#form.addEventListener("submit", (e) => {
      const isNameVallid = this.checkNameValidity();
      const isRowsValid = this.checkRowsValidity();
      const isColsValid = this.checkColsValidity();

      if (!isNameVallid || !isRowsValid || !isColsValid) {
        e.preventDefault();
      } else {
        e.preventDefault();
        this.#numCols = this.#cols.value;
        this.#cols.value = "";
        this.#numRows = this.#rows.value;
        this.#rows.value = "";
        this.#gameName = this.#nameInp.value;
        this.#nameInp.value = "";
      }
    });
  }
}

export default Form;
